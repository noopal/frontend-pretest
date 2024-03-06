import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";

const { Header } = Layout;
const { Item } = Menu;

const Navbar = () => {
  return (
    <Header className="flex items-end">
      <div className="demo-logo" />
      <Menu theme="dark" mode="horizontal" className="flex min-w-0">
        <Item key="pretest1">
          <Link to="/pretest-1">Pre-Test 1</Link>
        </Item>
        <Item key="pretest2">
          <Link to="/pretest-2">Pre-Test 2</Link>
        </Item>
        <Item key="Login">
          <Link to="/">Login</Link>
        </Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
