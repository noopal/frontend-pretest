import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, errors } = useAuthContext;

  const handleLogin = async (evet) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <div style={{ width: 400, margin: "auto", marginTop: 50 }}>
      <h1 style={{ textAlign: "center" }}>Formulir Login Pengguna</h1>
      <Form
        form={form}
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Masukkan email yang valid!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Masukkan kata sandi!" }]}>
          <Input.Password />
        </Form.Item>

        {errorMessage && (
          <div style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
