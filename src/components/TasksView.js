import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { Col, Row } from 'antd';
import { useState } from 'react';
import TaskTag from './TaskTag';
import PriorityTab from './PriorityTab';
import { nanoid } from 'nanoid';
import Item from 'antd/lib/list/Item';

const TasksView = (props) => {
    const [parent, setParent] = useState(null);
    const [items] = useState(['1', '2', '3', '4', '5']);
    const [activeId, setActiveId] = useState(null);

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd() {
        setActiveId(null);
    }

    function handleDragEnd({ over }) {
        setParent(over ? over.id : null);
    }


    const draggable = (
        <TaskTag id={nanoid()} />
    )


    return (
        <div
            style={{
                margin: 'auto',
                border: '1px solid blue',
                justifyContent: 'center',
            }}
        >
            <DndContext
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                closestCenter
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

                        <PriorityTab id='low'>
                            {/* {parent === 'low' ? draggable : 'Drop here'} */}
                            {items.map(id =>
                                <TaskTag key={id} id={id}>
                                    {id}
                                </TaskTag>
                            )}
                        </PriorityTab>
                    </Col>
                    <Col span={4}>
                        <PriorityTab id='normal'>
                            {/* {parent === "normal" ? draggable : 'Drop here'} */}
                        </PriorityTab>
                    </Col>
                    <Col span={4}>
                        <PriorityTab id='high'>
                            {/* {parent === "high" ? draggable : 'Drop here'} */}
                        </PriorityTab>
                    </Col>
                    <Col span={4}>
                        <PriorityTab id='doing'>
                            {/* {parent === "doing" ? draggable : 'Drop here'} */}
                        </PriorityTab>
                    </Col>
                    <Col span={4}>
                        <PriorityTab id='done'>
                            {/* {parent === "done" ? draggable : 'Drop here'} */}
                        </PriorityTab>
                    </Col>
                </Row >
                <DragOverlay>
                    {activeId ? (
                        <Item value={`Item ${activeId}`} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div >
    )
};
export default TasksView;