import React, { PropsWithChildren, PureComponent } from "react";
import { observer } from "mobx-react";

import Layout, { Content, Header } from "antd/es/layout/layout";
import Menu from "antd/es/menu";
import Dropdown from "antd/es/dropdown";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import user from "../model/User";

@observer
export class PageBox extends PureComponent<PropsWithChildren<{}>> {
  renderSignIn() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background:
            "url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>
          <img
            style={{ width: "3rem", marginRight: "1rem" }}
            src="https://github.com/ant-design.png"
          />
          React-MobX-Ant-Design.ts
        </h1>
        <Form onFinish={(data) => user.signIn(data)}>
          <FormItem name="account">
            <Input addonBefore={<UserOutlined />} placeholder="test" />
          </FormItem>
          <FormItem name="key">
            <Input
              type="password"
              addonBefore={<LockOutlined />}
              placeholder="123456"
            />
          </FormItem>
          <Button htmlType="submit" type="primary" block>
            登录
          </Button>
        </Form>
      </div>
    );
  }

  render() {
    const { children } = this.props;
    const { session } = user;

    return !session ? (
      this.renderSignIn()
    ) : (
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            style={{ height: "80%", marginRight: "1rem" }}
            src="https://github.com/ant-design.png"
          />
          <Menu mode="horizontal" theme="dark" style={{ flex: 1 }}>
            <Menu.Item>
              <a
                target="_blank"
                href="https://github.com/idea2app/React-MobX-Ant-Design-ts"
              >
                Source code
              </a>
            </Menu.Item>
          </Menu>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => user.signOut()}>退出登录</Menu.Item>
              </Menu>
            }
          >
            <div style={{ color: "white", padding: "0 1rem" }}>
              {session.account}
            </div>
          </Dropdown>
        </Header>

        <Content>{children}</Content>
      </Layout>
    );
  }
}
