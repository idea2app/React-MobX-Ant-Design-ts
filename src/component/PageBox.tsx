import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Form, Input, Layout, Menu } from 'antd';
import { observer } from 'mobx-react';
import { PropsWithChildren, PureComponent } from 'react';
import { Link } from 'react-router-dom';

import user from '../model/User';

export type PageBoxProps = PropsWithChildren<{ narrow?: boolean }>;

@observer
export class PageBox extends PureComponent<PageBoxProps> {
  renderSignIn() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background:
            'url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h1>
          <img
            style={{ width: '3rem', marginRight: '1rem' }}
            src="https://github.com/ant-design.png"
          />
          React-MobX-Ant-Design.ts
        </h1>
        <Form onFinish={data => user.signIn(data)}>
          <Form.Item name="account" required>
            <Input addonBefore={<UserOutlined />} placeholder="admin" />
          </Form.Item>
          <Form.Item name="key" required>
            <Input
              type="password"
              addonBefore={<LockOutlined />}
              placeholder="19890604"
            />
          </Form.Item>
          <Button htmlType="submit" type="primary" block>
            登录
          </Button>
        </Form>
      </div>
    );
  }

  render() {
    const { narrow, children } = this.props;
    const { session } = user;

    return !session ? (
      this.renderSignIn()
    ) : (
      <Layout>
        <Layout.Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <img
            style={{ height: '80%', marginRight: '1rem' }}
            src="https://github.com/ant-design.png"
          />
          <Menu mode="horizontal" theme="dark" style={{ flex: 1 }}>
            <Menu.Item key="pagination">
              <Link to="/pagination">Pagination</Link>
            </Menu.Item>
            <Menu.Item key="source-code">
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
                <Menu.Item key="exit" onClick={() => user.signOut()}>
                  Exit
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar src={session.avatar}>{session.account}</Avatar>
          </Dropdown>
        </Layout.Header>

        <Layout.Content
          style={{ width: narrow ? '90vw' : '100vw', margin: 'auto' }}
        >
          {children}
        </Layout.Content>

        <Layout.Footer style={{ textAlign: 'center' }}>
          ©2021-{new Date().getFullYear()}
          <a className="ms-2" target="_blank" href="https://ideapp.dev/">
            idea2app
          </a>
        </Layout.Footer>
      </Layout>
    );
  }
}
