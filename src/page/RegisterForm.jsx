import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
      setLoading(false);
      setSuccessMessage(response.data.message);
      form.resetFields(); // Reset the form fields after successful registration
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.password
      ) {
        setErrorMessage(error.response.data.password[0]);
      } else {
        setErrorMessage("Pendaftaran gagal. Silakan coba lagi.");
      }
    }
  };

  return (
    <div style={{ width: 400, margin: "auto", marginTop: 50 }}>
      <h1 style={{ textAlign: "center" }}>Formulir Pendaftaran Pengguna</h1>
      <Form
        form={form}
        name="register-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}>
        <Form.Item
          label="Nama Pengguna"
          name="name"
          rules={[{ required: true, message: "Masukkan nama pengguna!" }]}>
          <Input />
        </Form.Item>

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

        <Form.Item
          label="Konfirmasi Password"
          name="password_confirmation"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Konfirmasi kata sandi!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Kata sandi tidak cocok!"));
              },
            }),
          ]}
          validateStatus={errorMessage ? "error" : ""}
          help={errorMessage}>
          <Input.Password />
        </Form.Item>

        {successMessage && (
          <div style={{ color: "green", textAlign: "center" }}>
            {successMessage}
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}>
            Daftar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
