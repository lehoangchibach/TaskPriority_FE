import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";

export function Item(props) {
    const task = props.task

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
        background: colorPicker(),
        flexDirection: 'row'
    };

    const handleOnClick = () => {
        props.onClick(task.taskId)
    }

    const remainingTime = () => {
        let nowDate = moment()
        let gapDays, gapHours, gapMins
        let res = []

        if (task.deadlineDate) {
            let deadlineDate = task.deadlineDate.format('YYYY-MM-DD')
            gapDays = moment(deadlineDate).diff(nowDate, 'days')
        }

        if (task.deadlineTime) {
            let deadlineTime = task.deadlineTime.format('hh:mm:ss')
            gapHours = moment(deadlineTime, 'hh:mm:ss').diff(nowDate, 'hours')
            gapMins = moment(deadlineTime, 'hh:mm:ss').diff(nowDate, 'minutes') % 60
        }

        if (gapDays) { res.push(`${gapDays} days`) }
        if (gapHours) { res.push(`${gapHours} hours`) }
        if (gapMins) { res.push(`${gapMins} mins`) }

        if (res.length === 0) { return 'No deadline' }
        if (res.length === 3) { return res.slice(0, 2).join(' ') }
        return res.join(' ')

    }

    return (
        <div
            style={style}
            onClick={handleOnClick}
        >

            <div
                style={{
                    flexGrow: 3
                }}
            >
                <div style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    fontWeight: 500,
                    fontSize: 'initial',
                }}>
                    <span>{task.title}</span>
                </div>
                <div>
                    <span>{task.summary}</span>
                </div>
            </div>

            <div style={{
                maxWidth: '30%',
                flexGrow: 1,
            }}>
                <span>
                    {remainingTime()}
                </span>
            </div>



        </div>
    )
}

const TaskTag = (props) => {


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.task.taskId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <Item value={props.value} task={props.task} onClick={props.onClick} />
        </div>
    );
}
export default TaskTag;

