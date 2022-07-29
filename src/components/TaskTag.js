import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
    const task = props.task
    const id = props.id

    const colorPicker = () => {
        switch (task.priority) {
            case 'low':
                return 'lightyellow'
            case 'normal':
                return 'skyblue'
            case 'high':
                return 'crimson'
            case 'doing':
                return 'lightgreen'
            case 'done':
                return 'lightgrey'
            default:
                return 'white'
        }
    }

    const style = {
        width: "100%",
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        margin: "10px 0",
        background: colorPicker()
    };

    const handleOnClick = () => {
        props.onClick(id)
    }

    return <div
        style={style}
        onClick={handleOnClick}>
        {/* {id} */}
        <h3>{task.title}</h3>
        <span>{task.summary}</span>
    </div>;
}

const TaskTag = (props) => {


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <Item id={props.id} value={props.value} task={props.task} onClick={props.onClick} />
        </div>
    );
}
export default TaskTag;
