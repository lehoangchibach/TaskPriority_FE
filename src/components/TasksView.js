import { Col, Row } from 'antd';
import TaskTag from './TaskTag';
import PriorityTab from './PriorityTab';
import React, { useState } from "react";
import { DndContext, DragOverlay, closestCenter, } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";



const TasksView = (props) => {
    const [items, setItems] = useState(
        {
            low: [
                {
                    id: '1L',
                    value: 'testLow1'
                },
                {
                    id: '2L',
                    value: 'testLow2'
                },
                {
                    id: '3L',
                    value: 'testLow3'
                }
            ],
            normal: [
                {
                    id: '1N',
                    value: 'testNormal1'
                },
                {
                    id: '2N',
                    value: 'testNormal2'
                },
                {
                    id: '3N',
                    value: 'testNormal3'
                }
            ],
            high: [
                {
                    id: '1H',
                    value: 'testHigh1'
                },
                {
                    id: '2H',
                    value: 'testHigh2'
                },
                {
                    id: '3H',
                    value: 'testHigh3'
                }
            ],
            doing: [
                {
                    id: '1D',
                    value: 'testDoing1'
                },
                {
                    id: '2D',
                    value: 'testDoing2'
                },
                {
                    id: '3D',
                    value: 'testDoing3'
                }
            ],
            done: []
        }
    );


    const [activeId, setActiveId] = useState(null);

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

        const activeIndex = items[activeContainer].map(item => item.id).indexOf(active.id);
        const overIndex = items[overContainer].map(item => item.id).indexOf(overId);

        if (activeIndex !== overIndex) {
            setItems((items) => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }));
        }

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
            const activeIndex = activeItems.map(item => item.id).indexOf(id);
            const overIndex = overItems.map(item => item.id).indexOf(overId);
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
                    ...prev[activeContainer].filter((item) => item.id !== active.id)
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
        return Object.keys(items).find(key => (items[key].map(item => item ? item.id : null)).includes(id))

    }

    const handleDragStart = (event) => {
        const { active } = event;
        const { id } = active;

        setActiveId(id);
    }


    return (

        <div
            style={{
                margin: 'auto',
                border: '1px solid blue',
                justifyContent: 'center',
            }}
        >
            <DndContext
                announcements={defaultAnnouncements}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
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
                        <PriorityTab id="low" items={items.low} />
                    </Col>
                    <Col span={4}>
                        <PriorityTab id="normal" items={items.normal} />
                    </Col>
                    <Col span={4}>
                        <PriorityTab id="high" items={items.high} />
                    </Col>
                    <Col span={4}>
                        <PriorityTab id="doing" items={items.doing} />
                    </Col>
                    <Col span={4}>
                        <PriorityTab id="done" items={items.done} />
                    </Col>

                </Row >


                <DragOverlay>{activeId ? <TaskTag id={activeId} /> : null}</DragOverlay>
            </DndContext>
        </div >
    )
};
export default TasksView;