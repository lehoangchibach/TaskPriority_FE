import { useDroppable } from "@dnd-kit/core";
const PriorityTab = (props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });

    const style = {
        color: isOver ? 'green' : 'gray',
        // opacity: isOver ? 1 : 0.5,
        border: '2px solid red',
        height: '100%',
        minHeight: '600px',
        width: '100%',
        backgroundColor: 'beige'

    };


    return (
        <div
            ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}
export default PriorityTab;