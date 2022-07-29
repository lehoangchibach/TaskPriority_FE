import { Col, Row } from 'antd';
import TaskTag from './TaskTag';
import PriorityTab from './PriorityTab';
import React, { useCallback, useEffect, useState } from "react";
import { DndContext, DragOverlay, closestCenter, useSensor, MouseSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { getAllTaskByUser, saveTask } from '../services/TaskAPI';
import Detail from './Detail';



const TasksView = (props) => {
    const [isVisible, setIsvisible] = useState(false);
    const [activeId, setActiveId] = useState(null)
    const [activeTask, setActiveTask] = useState(null)
    const [items, setItems] = useState({
        'low': [],
        'normal': [],
        'high': [],
        'doing': [],
        'done': []
    });
    const [task, setTask] = useState({
        owner: 'huyenpham',
        title: null,
        summary: null,
        deadlineDate: null,
        deadlineTime: null,
        detail: null,
        priority: null,
        taskId: null,
    });

    useEffect(() => {
        getItemsList()
    }, [task])

    const getItemsList = () => {
        getAllTaskByUser({ userName: "huyenpham" }).then(response => {
            setItems(response.data)
        })
    }

    const handleSaveTask = useCallback((values) => {
        console.log('values', values);
        const payload = ({ ...task, ...values })
        console.log('payload', payload);
        saveTask({ data: payload }).then(() => {
            setTask(payload)
        })
    }, [task])

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });

    const defaultAnnouncements = {
        onDragStart(id) {
            console.log(`Picked up draggable item ${id}.`);
        },
        onDragOver(id, overId) {
            if (overId) {
                console.log(
                    `Draggable item ${id} was moved over droppable area ${overId}.`
                );
                return;
            }

            console.log(`Draggable item ${id} is no longer over a droppable area.`);
        },
        onDragEnd(id, overId) {
            if (overId) {
                console.log(
                    `Draggable item ${id} was dropped over droppable area ${overId}`
                );
                return;
            }

            console.log(`Draggable item ${id} was dropped.`);
        },
        onDragCancel(id) {
            console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
        }
    };

    const handleDragEnd = (event) => {
        console.log('Drag End', event);
        console.log('activeId', activeId);
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

        let currentItem = items[overContainer].find(each => each.taskId === activeId)
        currentItem.priority = overContainer
        saveTask({ data: currentItem })

        setActiveId(null);
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

    const findContainer = (id) => {
        if (id in items) {
            return id;
        }
        return Object.keys(items).find(key => (items[key].map(item => item ? item.taskId : null)).includes(id))

    }

    const handleDragStart = (event) => {
        console.log("start Drag", event);
        const { active } = event;
        const { id } = active;
        const currentContainer = event.active.data.current.sortable.containerId
        const currentTask = items[currentContainer].find(each => each.taskId === id)

        console.log('currentContainer', currentContainer);
        console.log('currentTask', currentTask);

        setActiveTask(currentTask)
        setActiveId(id);
    }
    function openDetail(id) {
        console.log(id);
        let task;
        Object.keys(items).forEach(key => {
            items[key].forEach(item => item.taskId === id ? task = item : null)
        })
        setTask(task)
        setIsvisible(true)
    }

    return (
        <div style={{
            margin: 'auto',
            border: '1px solid blue',
            justifyContent: 'center',
        }}
        >
            <Detail isVisible={isVisible} setIsvisible={setIsvisible} task={task} setTask={setTask} handleSaveTask={handleSaveTask} />
            <DndContext
                announcements={defaultAnnouncements}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                sensors={[mouseSensor]}
            >
                <Row
                    style={{
                        justifyContent: 'space-around',
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


                <DragOverlay>{activeId ? <TaskTag id={activeId} task={activeTask} /> : null}</DragOverlay>
            </DndContext>
        </div >
    )
};
export default TasksView;