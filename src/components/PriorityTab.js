import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskTag from "./TaskTag";

const containerStyle = {
    background: "#dadada",
    padding: 10,
    margin: 10,
    flex: 1
};

const Container = (props) => {
    const { id, items } = props;

    const { setNodeRef } = useDroppable({
        id
    });

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={verticalListSortingStrategy}
        >
            <div ref={setNodeRef} style={containerStyle}>
                {/* {console.log(items)} */}
                {items.map((item) => (
                    item ? <TaskTag key={item.id} id={item.id} value={item.value} /> : null
                ))}
            </div>
        </SortableContext>
    );
}
export default Container;
