import { Button, Form, DatePicker, Input, Select, TimePicker, Space } from "antd";
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import { useEffect } from "react";
import moment from "moment";
const Detail = (props) => {
    const { Option } = Select;
    let isVisible = props.isVisible;
    let setIsvisible = props.setIsvisible;
    const task = props.task
    const [form] = Form.useForm()
    const handleSaveTask = props.handleSaveTask
    const handleDelete = props.handleDelete

    const timeFormat = 'hh:mm:ss a'

    useEffect(() => {
        form.resetFields()
    })

    const handleCancel = () => {
        setIsvisible(false)
    }

    const showDeleteButton = () => {
        if (!handleDelete) { return true }
        return false
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
                            label={'Time'}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value) { return Promise.resolve() }
                                        let time = value.format("hh:mm:ss a")
                                        time = moment(time, "hh:mm:ss a").local()
                                        let now = moment().local()
                                        console.log(time);

                                        if (now.isBefore(getFieldValue('deadlineDate'))) {
                                            return Promise.resolve();
                                        }
                                        if (now.isBefore(time)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The time must be later than now!'));
                                    },
                                })
                            ]}
                        >
                            <TimePicker format={timeFormat} placeholder='deadlineTime'></TimePicker>
                        </Form.Item>

                        <Form.Item
                            name={'deadlineDate'}
                            label={'Date'}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value) { return Promise.resolve() }
                                        let now = moment().local()
                                        if (now.isBefore(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The date must be later than today!'));
                                    },
                                })
                            ]}
                        >
                            <DatePicker
                                placeholder='deadlineDate'
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
                                    disabled={showDeleteButton()}
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

