import React, { useEffect, useState } from "react";
import { Layout, theme, Table } from "antd";

const { Content } = Layout;

const Pretest1 = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/get-random-user");
      const jsonData = await response.json();
      setData(jsonData);

      const profesiCount = jsonData.reduce((acc, curr) => {
        const profesi = curr.table_profesi
          ? curr.table_profesi.nama_profesi
          : "Tidak Diketahui";
        acc[profesi] = (acc[profesi] || 0) + 1;
        return acc;
      }, {});

      const summaryData = Object.keys(profesiCount).map((profesi) => ({
        profesi,
        total: profesiCount[profesi],
      }));

      setSummary(summaryData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columnsData = [
    {
      title: "Nomor",
      dataIndex: "id",
      key: "id",
    },
    { title: "Nama", dataIndex: "nama", key: "nama" },
    {
      title: "Jenis Kelamin",
      dataIndex: "jenis_kelamin",
      key: "jenis_kelamin",
      render: (text, record) =>
        record.jenis_kelamin ? record.jenis_kelamin.jenis_kelamin : text,
    },
    { title: "Jalan", dataIndex: "nama_jalan", key: "nama_jalan" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Profesi",
      dataIndex: "profesi",
      key: "profesi",
      render: (text, record) =>
        record.table_profesi ? record.table_profesi.nama_profesi : text,
    },
  ];

  const columnsSummary = [
    {
      title: "Nomor",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    { title: "Profesi", dataIndex: "profesi", key: "profesi" },
    { title: "Total", dataIndex: "total", key: "total" },
  ];

  return (
    <Content style={{ padding: "0 48px" }}>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 10,
          margin: 10,
          borderRadius: borderRadiusLG,
        }}>
        <h1>Hasil Response</h1>
        <Table
          columns={columnsData}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 10,
          margin: 10,
          borderRadius: borderRadiusLG,
        }}>
        <h2>Ringkasan Profesi</h2>
        <Table columns={columnsSummary} dataSource={summary}  />
      </div>
    </Content>
  );
};

export default Pretest1;
