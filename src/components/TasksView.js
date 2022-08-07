import { Button, Col, Row } from 'antd';
import TaskTag from './TaskTag';
import PriorityTab from './PriorityTab';
import React, { useCallback, useEffect, useState } from "react";
import { DndContext, DragOverlay, closestCenter, useSensor, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { getAllTaskByUser, saveTask, createTask, deleteTask } from '../services/TaskAPI';
import Detail from './Detail';
import moment from 'moment';
import ChangeInformation from './changeInformation';
import useToken from './useToken';



const TasksView = (props) => {
    const setToken = props.setToken
    const { token } = useToken()
    const userName = token.userName
    const [isVisibleDetail, setIsVisibleDetail] = useState(false)
    const [isVisibleCreateTask, setIsVisibleCreateTask] = useState(false)
    const [isVisibleChangeInformation, setisVisibleChangeInformation] = useState(false)
    const [activeTask, setActiveTask] = useState(null)
    const [items, setItems] = useState({
        'low': [],
        'normal': [],
        'high': [],
        'doing': [],
        'done': []
    })
    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    })
    const touchSensor = useSensor(TouchSensor, {
        // Require the touch to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    })
    const [task, setTask] = useState({
        owner: userName,
        title: null,
        summary: null,
        deadlineDate: null,
        deadlineTime: null,
        detail: null,
        priority: null,
        taskId: null,
    })
    const [newTask, setNewTask] = useState({
        owner: userName,
        title: null,
        summary: null,
        deadlineDate: null,
        deadlineTime: null,
        detail: null,
        priority: null,
        taskId: null,
    })

    const getItemsList = useCallback((values) => {
        getAllTaskByUser({ userName: userName }).then(response => {
            Object.keys(response.data).forEach(key => {
                response.data[key].forEach(task => {
                    if (task.deadlineTime) {
                        let time = moment.utc(task.deadlineTime, 'hh:mm:ss').local()
                        task.deadlineTime = time
                    }
                    if (task.deadlineDate) {
                        let date = moment.utc(task.deadlineDate, 'YYYY-MM-DD')
                        task.deadlineDate = date
                    }

                })
            })


            setItems(response.data)
        })
    }, [userName])

    useEffect(() => {
        getItemsList()
    }, [getItemsList])

    const handleCreateTask = (values) => {
        const payload = ({ ...newTask, ...values })
        // console.log('createTask', payload)
        setItems((prev) => {
            prev[payload.priority].push(payload)
            return prev
        })
        createTask({ data: payload }).then(() => {
            setNewTask({
                owner: userName,
                title: null,
                summary: null,
                deadlineDate: null,
                deadlineTime: null,
                detail: null,
                priority: null,
                taskId: null
            })
        })
        setIsVisibleCreateTask(false)
    }

    const handleSaveTask = useCallback((values) => {
        const payload = ({ ...task, ...values })

        saveTask({ data: payload }).then(() => {
            setTask(payload)
        })
        setItems((prev) => {
            const index = prev[payload.priority].findIndex((each) => each.taskId === payload.taskId)
            prev[payload.priority].splice(index, 1, payload)
            return prev
        })
        setIsVisibleDetail(false)
    }, [task])

    const handleDelete = () => {
        deleteTask({ taskId: task.taskId }).then(() => {
            setTask(null)
        })
        setItems((prev) => {
            const index = prev[task.priority].findIndex((each) => each.taskId === task.taskId)
            prev[task.priority].splice(index, 1)
            return prev
        })
        setIsVisibleDetail(false)
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;

        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = items[activeContainer].map(item => item.taskId).indexOf(active.id);
        const overIndex = items[overContainer].map(item => item.taskId).indexOf(overId);

        if (activeIndex !== overIndex) {
            setItems((items) => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }));
        }

        let currentItem = items[overContainer].find(each => each.taskId === activeTask.taskId)
        currentItem.priority = overContainer
        saveTask({ data: currentItem })

        setActiveTask(null)
    }

    const handleDragOver = (event) => {
        const { active, over, draggingRect } = event;
        const { id } = active;
        const { id: overId } = over;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {

            return;
        }

        setItems((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            // Find the indexes for the items
            const activeIndex = activeItems.map(item => item.taskId).indexOf(id);
            const overIndex = overItems.map(item => item.taskId).indexOf(overId);
            let newIndex;
            if (overId in prev) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem =
                    over &&
                        overIndex === overItems.length - 1 &&
                        draggingRect ? draggingRect.offsetTop : -Infinity > over.rect.offsetTop + over.rect.height;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

            }

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item.taskId !== active.id)
                ],

                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            };
        });
    }

    const handleDragStart = (event) => {
        const { active } = event;
        const { id } = active;
        const currentContainer = event.active.data.current.sortable.containerId
        const currentTask = items[currentContainer].find(each => each.taskId === id)


        setActiveTask(currentTask)
    }

    const findContainer = (id) => {
        if (id in items) {
            return id;
        }
        return Object.keys(items).find(key => (items[key].map(item => item ? item.taskId : null)).includes(id))

    }

    const openDetail = (id) => {
        let task;
        Object.keys(items).forEach(key => {
            items[key].forEach(item => item.taskId === id ? task = item : null)
        })
        // console.log('openDetail', task);
        setTask(task)
        setIsVisibleDetail(true)
    }

    const openCreateTask = () => {
        setIsVisibleCreateTask(true)
    }

    const openChangeInformation = () => {
        setisVisibleChangeInformation(true)
    }

    const logOut = () => {
        setToken(null)
    }


    return (
        <div style={{
            margin: 'auto',
            border: '1px solid blue',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.5%'
        }}
        >
            <div
                style={{
                    alignSelf: 'flex-end',
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}>
                <Button type="primary" onClick={openChangeInformation} token={token}>
                    Hello {token['displayName']}
                </Button>

                <Button type='danger' onClick={logOut}>Log out</Button>
            </div>

            <Button type="primary" onClick={openCreateTask}>Create Task</Button>
            <ChangeInformation isVisible={isVisibleChangeInformation} setIsvisible={setisVisibleChangeInformation} setToken={setToken} />
            <Detail isVisible={isVisibleCreateTask} setIsvisible={setIsVisibleCreateTask} task={newTask} setTask={setNewTask} handleSaveTask={handleCreateTask} />
            <Detail isVisible={isVisibleDetail} setIsvisible={setIsVisibleDetail} task={task} setTask={setTask} handleSaveTask={handleSaveTask} handleDelete={handleDelete} />
            <div
                style={{
                    alignSelf: 'stretch'
                }}
            >
                <DndContext
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    sensors={[mouseSensor, touchSensor]}
                >
                    <Row
                        style={{
                            justifyContent: 'space-around',
                            fontWeight: 500,
                            fontSize: "initial",
                        }}
                    >
                        <Col span={4}>Low Priority</Col>
                        <Col span={4}>Normal Priority</Col>
                        <Col span={4}>High Priority</Col>
                        <Col span={4}>Doing</Col>
                        <Col span={4}>Done</Col>
                    </Row>
                    <Row
                        style={{
                            justifyContent: 'space-around',
                        }}
                    >
                        <Col span={4}>
                            <PriorityTab id="low" items={items.low} onClick={openDetail} />
                        </Col>
                        <Col span={4}>
                            <PriorityTab id="normal" items={items.normal} onClick={openDetail} />
                        </Col>
                        <Col span={4}>
                            <PriorityTab id="high" items={items.high} onClick={openDetail} />
                        </Col>
                        <Col span={4}>
                            <PriorityTab id="doing" items={items.doing} onClick={openDetail} />
                        </Col>
                        <Col span={4}>
                            <PriorityTab id="done" items={items.done} onClick={openDetail} />
                        </Col>

                    </Row >


                    <DragOverlay>{activeTask ? <TaskTag task={activeTask} /> : null}</DragOverlay>
                </DndContext>
            </div>
        </div >
    )
};
export default TasksView;