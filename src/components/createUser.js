import { Button, Form, Input } from "antd";
// import { createUser } from "../services/UserAPI";

const CreateUser = () => {
    const onFinish = (values) => {
        console.log(values);
        // createUser({ data: values }).then(response => {
        //     console.log(response.data);
        //     if (response.data['userName']) {
        //         setToken({ data: response.data })
        //     } else { alert(response.data) }
        // })

    };

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
                    onFinish={onFinish}
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

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    );

}

export default CreateUser;