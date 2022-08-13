import { Button, Form, Input } from "antd";
import { logIn, createUser } from "../services/UserAPI";
// import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const Login = (props) => {
    let setToken = props.setToken
    // const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)

    const onFinishLogin = (values) => {
        logIn({ data: values }).then(response => {
            if (response.data['userName']) {
                setToken({ data: response.data })
            } else { alert(response.data) }
        })

        // setToken({
        //     data: {
        //         userName: 'testusername',
        //         displayName: 'Bach Le'
        //     }
        // })
    };

    const onFinishCreateUser = (values) => {
        createUser({ data: values }).then(response => {
            if (response.data['userName']) {
                setToken({ data: response.data })
                openLogIn(true)
            } else { alert(response.data) }
        })



    };

    const openSignUp = () => {
        setIsLogin(false)
    }

    const openLogIn = () => {
        setIsLogin(true)
    }

    if (isLogin) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px'
                }}
            >
                <h1>Welcome to TaskPriority</h1>
                <span>This is Bach's first website. I know it looks horrible, but I promise to make it more handsome in the future</span>
                <span>Thank you for sticking around!</span>
                <h2>Login</h2>
                <h5>Test account: huyenpham - 123456</h5>
                <div>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 9,
                        }}
                        style={{
                            width: '400px'
                        }}
                        onFinish={onFinishLogin}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" >Log in</Button>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            ><Button onClick={openSignUp}>Sign up</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div >
        );
    } else {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px'
                }}
            >
                <h1>Welcome to TaskPriority</h1>
                <h2>Create new account</h2>
                <div>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 9,
                        }}
                        style={{
                            width: '400px'
                        }}
                        onFinish={onFinishCreateUser}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Display name"
                            name="displayName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your display name!',
                                },
                            ]}
                        >
                            <Input placeholder="What do you want me to call you?" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'
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
                            >
                                <Button onClick={openLogIn}>Log in</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div >
        );
    }



}

export default Login;