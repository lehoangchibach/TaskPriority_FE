import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'antd';

const TaskTag = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = {
        transform: CSS.Translate.toString(transform)
    }

    const openDetail = () => { }

    return (
        <div
            ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Button
                type='primary'
                onClick={openDetail}
                style={{ opacity: 1 }}
            >
                {props.children}
            </Button>
        </div>
    )
};
export default TaskTag;