import { Button, Form, DatePicker, Input, Select, TimePicker, Space } from "antd";
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import { useEffect } from "react";
const Detail = (props) => {
    const { Option } = Select;
    let isVisible = props.isVisible;
    let setIsvisible = props.setIsvisible;
    const task = props.task
    const [form] = Form.useForm()
    const handleSaveTask = props.handleSaveTask

    useEffect(() => {
        form.resetFields()
    })

    const handleDelete = () => {
        setIsvisible(false)
    }
    const handleCancel = () => {
        setIsvisible(false)
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
                        onFinish={handleSaveTask}
                        initialValues={task}
                        form={form}
                    >
                        <Form.Item
                            name='title'
                            label="Title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your title"
                                }
                            ]}
                        >
                            <Input placeholder={"Title"} maxLength={20} />
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
                            <Input placeholder={"Summary"} maxLength={100} value='summary' />
                        </Form.Item>

                        <Form.Item
                            name={'detail'}
                            label={"Detail"}
                        >
                            <TextArea
                                placeholder="Detail"
                                value='detail'
                                maxLength={1000}></TextArea>
                        </Form.Item>


                        <Form.Item
                            name={'deadlineTime'}
                            label={'Time'}>
                            <TimePicker
                                value='deadlineTime'></TimePicker>
                        </Form.Item>
                        <Form.Item
                            name={'deadlineDate'}
                            label={'Date'}>
                            <DatePicker
                                value='deadlineDate'
                            ></DatePicker>
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
                                value='priority'
                            >
                                <Option value='low'>Low</Option>
                                <Option value='normal'>Normal</Option>
                                <Option value='high'>High</Option>
                                <Option value='doing'>Doing</Option>
                                <Option value='done'>Done</Option>

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
                                // onClick={handleSave}
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

