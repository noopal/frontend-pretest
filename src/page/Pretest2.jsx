import React, { useEffect, useState } from "react";
import { Layout, Button, Modal, Table, Form, Input } from "antd";
import BarangFormModal from "../components/BarangFormModal";
import axios from "axios";

const { Content } = Layout;

function Pretest2() {
  const [barang, setBarang] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchBarang();
  }, []);

  const fetchBarang = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/barang");
      const jsonData = await response.json();
      setBarang(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching barang:", error);
      setIsLoading(false);
    }
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditData(null);
  };

  const handleEdit = (record) => {
    setEditData(record);
    setModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editData) {
        await axios.put(`http://localhost:8000/api/barang/${id}`, values);
      } else {
        // Jika tidak ada, kirim permintaan POST
        await axios.post("http://localhost:8000/api/barang", values);
      }
      fetchBarang();
      handleModalClose(); 
    } catch (error) {
      console.error("Error saving barang:", error);
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Kode",
      dataIndex: "kode",
      key: "kode",
    },
    {
      title: "Kategori",
      dataIndex: "kd_kategori",
      key: "kd_kategori",
      render: (text, record) =>
        record.kategori ? record.kategori.nama_kategori : text,
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Jumlah",
      dataIndex: "jumlah",
      key: "jumlah",
    },
    {
      title: "Satuan",
      dataIndex: "kd_satuan",
      key: "kd_satuan",
      render: (text, record) =>
        record.satuan ? record.satuan.nama_satuan : text,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Content style={{ padding: "0 48px" }}>
      <div
        style={{
          background: "#fff",
          minHeight: 280,
          padding: 24,
        }}>
        <Button type="primary" onClick={handleModalOpen}>
          Tambah Barang
        </Button>
        <Modal
          title={editData ? "Edit Barang" : "Tambah Barang"}
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={null}>
          <BarangFormModal
            onSuccess={fetchBarang}
            onClose={handleModalClose}
            initialValues={editData}
            onSubmit={handleFormSubmit}
          />
        </Modal>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table
            pagination={{ pageSize: 5 }}
            dataSource={barang.map((item, index) => ({ ...item, index }))}
            columns={columns}
          />
        )}
      </div>
    </Content>
  );
}

export default Pretest2;
