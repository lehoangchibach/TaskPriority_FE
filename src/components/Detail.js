import { Button, Form, DatePicker, Input, Select, TimePicker, Space } from "antd";
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
// import {ProForm, ProFormDatePicker, ProFormText} from "@ant-design/pro-form";
const Detail = (props) => {
    const { Option } = Select;
    let isVisible = props.isVisible;
    let setIsvisible = props.setIsvisible;
    let task;
    if (props.task) {
        task = props.task
    }
    else {
        task = {
            title: null,
            summary: null,
            detail: null,
            time: null,
            date: null,
            priority: null
        }
    }

    const handleSave = () => {
        console.log('save');
    }
    const handleDelete = () => {
        setIsvisible(false)
    }
    const handleCancel = () => {
        setIsvisible(false)
    }

    const handleValuesChange = (values) => {
        task = values
        console.log(task);
    }

    return (
        <div>
            <Modal
                title={'Task detail'}
                visible={isVisible}
                onCancel={handleCancel}
                footer={[]}
            >
                <div>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        onFinish={handleValuesChange}
                    >
                        <Form.Item
                            name={'title'}
                            label={"Title"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your title"
                                }
                            ]}>
                            <Input placeholder={"Title"} maxLength={20} value={task.title} />
                        </Form.Item>

                        <Form.Item
                            name={'summary'}
                            label={"Summary"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your summary"
                                }
                            ]}>
                            <Input placeholder={"Summary"} maxLength={100} value={task.summary} />
                        </Form.Item>

                        <Form.Item
                            name={'detail'}
                            label={"Detail"}
                        >
                            <TextArea
                                placeholder="Detail"
                                value={task.detail}
                                maxLength={1000}></TextArea>
                        </Form.Item>


                        <Form.Item
                            label={'Deadline'}>
                            <TimePicker
                                value={task.time}></TimePicker>
                            &nbsp; &nbsp;
                            <DatePicker
                                value={task.date}></DatePicker>
                        </Form.Item>


                        <Form.Item
                            name={'priority'}
                            label={'Priority'}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the priority"
                                }
                            ]}>
                            <Select
                                placeholder="Select the priority of the task"
                                allowClear
                                value={task.priority}
                            >
                                <Option value='low'>Low</Option>
                                <Option value='normal'>Normal</Option>
                                <Option value='high'>High</Option>
                                <Option value='doing'>Doing</Option>

                            </Select>
                        </Form.Item>

                        <Form.Item
                            style={{
                                float: "right",
                                marginLeft: 'auto'
                            }}>
                            <Space>
                                <Button
                                    type="danger"
                                    icon={<DeleteOutlined />}
                                    style={{ borderRadius: 5 }}
                                    onClick={handleDelete}>Delete
                                </Button>

                                <Button
                                    type="primary"
                                    icon={<SaveOutlined />}
                                    style={{ borderRadius: 5 }}
                                    htmlType="submit"
                                    onClick={handleSave}
                                >Save
                                </Button>
                            </Space>

                        </Form.Item>
                    </Form>
                </div>
            </Modal >
        </div >
    )
};
export default Detail;

