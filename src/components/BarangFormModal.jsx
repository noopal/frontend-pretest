import React, { useState, useEffect } from "react";
import { Layout, Form, Select, Input, Button, message } from "antd";
import axios from "axios";

const { Content } = Layout;
const { Option } = Select;

const BarangForm = ({ onSuccess, onClose }) => {
  const [kategoriBarangOptions, setKategoriBarangOptions] = useState([]);
  const [satuanBarangOptions, setSatuanBarangOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/kategori-barang")
      .then((response) => {
        const options = response.data.map((kategori) => ({
          value: kategori.id,
          label: kategori.kode + " - " + kategori.nama_kategori,
        }));
        setKategoriBarangOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching kategori barang:", error);
        message.error("Error fetching kategori barang. Please try again.");
      });

    axios
      .get("http://localhost:8000/api/satuan-barang")
      .then((response) => {
        const options = response.data.map((satuan) => satuan.nama_satuan);
        setSatuanBarangOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching satuan barang:", error);
        message.error("Error fetching satuan barang. Please try again.");
      });
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:8000/api/barang", values);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating barang:", error);
    }
  };

  const validateSatuan = (rule, value) => {
    if (!satuanBarangOptions.includes(value)) {
      return Promise.reject("Satuan barang tidak valid");
    }
    return Promise.resolve();
  };

  return (
    <Content style={{ padding: "0 24px" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="kd_kategori"
          label="Kode Kategori Barang"
          rules={[{ required: true, message: "Please select the category" }]}>
          <Select placeholder="Select a category">
            {kategoriBarangOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="nama"
          label="Nama Barang"
          rules={[{ required: true, message: "Please enter the name" }]}>
          <Input placeholder="Enter the name of the item" />
        </Form.Item>
        <Form.Item
          name="kd_satuan"
          label="Satuan Barang"
          rules={[
            { required: true, message: "Please enter the Unit" },
            { validator: validateSatuan },
          ]}>
          <Input placeholder="Enter the unit" />
        </Form.Item>
        <Form.Item
          name="jumlah"
          label="Jumlah"
          rules={[{ required: true, message: "Please enter the quantity" }]}>
          <Input type="number" placeholder="Enter the quantity" />
        </Form.Item>
        <Form.Item
          label="ID User"
          name="id_user_insert"
          hidden
          initialValue={Math.floor(Math.random() * 1000) + 1}>
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default BarangForm;
