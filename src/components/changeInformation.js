import { Button, Form, Input, Modal } from "antd";
import { useState, useEffect } from "react";
import useToken from "./useToken";
import { updateDisplayName, changePassword } from "../services/UserAPI";


const ChangeInformation = (props) => {
    const { token } = useToken()
    const setToken = props.setToken
    let isVisible = props.isVisible
    const setIsvisible = props.setIsvisible
    const [isChangeDisplayName, setIsChangeDisplayName] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        form.resetFields()
    })

    const handleCancel = () => {
        setIsvisible(false)
    }

    const onFinishPassword = (values) => {
        const payload = { ...token, ...values }
        changePassword({ data: payload }).then(response => {
            console.log(response)
        })
    }

    const onFinishDisplayName = (values) => {
        console.log(values);
        const payload = { ...token, ...values }
        updateDisplayName({ data: payload }).then(response => {
            alert(response.data)
        })
        setToken({ data: payload })
        setIsvisible(false)
    }

    const openDisplayName = (values) => {
        setIsChangeDisplayName(true)
    }

    const openPassword = (values) => {
        setIsChangeDisplayName(false)
    }



    if (isChangeDisplayName) {
        return (
            <Modal
                title={'Change Information'}
                visible={isVisible}
                onCancel={handleCancel}
                footer={[]}
            >

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px'
                    }}
                >
                    <h2>Change your display name</h2>
                    <div>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 7,
                            }}
                            style={{
                                width: '400px'
                            }}
                            onFinish={onFinishDisplayName}
                            autoComplete="off"
                            initialValues={token}
                            form={form}
                        >
                            <Form.Item
                                label="Display name"
                                name={"displayName"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your display name!',
                                    },
                                ]}
                            >
                                <Input placeholder="What do you want me to call you?" />
                            </Form.Item>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit" >Submit</Button>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                ><Button onClick={openPassword}>Change password</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div >
            </Modal>
        )
    } else {
        return (
            <Modal
                title={'Change Information'}
                visible={isVisible}
                onCancel={handleCancel}
                footer={[]}
            >

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px'
                    }}
                >
                    <h2>Change your password</h2>
                    <div>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            style={{
                                width: '400px'
                            }}
                            onFinish={onFinishPassword}
                            autoComplete="off"
                            initialValues={token}
                            form={form}
                        >
                            <Form.Item
                                label="Old password"
                                name="oldPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your old password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="New password"
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Confirm password"
                                name="confirmNewPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your new password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The confirm passwoord does not match!'));
                                        },
                                    })
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit" >Submit</Button>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                ><Button onClick={openDisplayName}>Change display name</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div >
            </Modal>
        )
    }

}

export default ChangeInformation;