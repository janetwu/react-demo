import { Form, Input, Button, Checkbox, message } from 'antd';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "@/store/actions";
import { useEffect } from 'react';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LoginForm = (props) => {
  const { login, token } = props;
  useEffect(()=>{
    login('janet').then((res)=>{
      console.log(res)
    }).catch((error) => {
        message.error(error);
      });
  }, [])
  const onFinish = (values) => {
    console.log('Success:', values);
    
    login(values.username, values.password).then((res)=>{
      console.log(res)
    }).catch((error) => {
        message.error(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (token) {
    return <Redirect to="/" />;
  }

  

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
        username: 'yuanlin',
        password: '123456'

      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
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

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};


export default connect((state) => state.user, { login })(
  LoginForm
);