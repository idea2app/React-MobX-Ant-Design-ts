import {
  LockOutlined,
  TranslationOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Form, Input, Layout, Menu } from 'antd';
import { observer } from 'mobx-react';
import { PropsWithChildren, PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { LanguageName, i18n } from '../model/Translation';
import user from '../model/User';

const { t } = i18n;

export type PageBoxProps = PropsWithChildren<{ narrow?: boolean }>;

@observer
export class PageBox extends PureComponent<PageBoxProps> {
  renderSignIn() {
    return (
      <div
        className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          background:
            'url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)'
        }}
      >
        <h1>
          <img
            className="me-1"
            style={{ width: '3rem' }}
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

  renderLinks() {
    return (
      <Menu
        className="flex-fill"
        mode="horizontal"
        theme="dark"
        items={[
          {
            key: 'pagination',
            label: <Link to="/pagination">{t('pagination')}</Link>
          },
          {
            key: 'source-code',
            label: (
              <a
                target="_blank"
                href="https://github.com/idea2app/React-MobX-Ant-Design-ts"
              >
                {t('source_code')}
              </a>
            )
          }
        ]}
      />
    );
  }

  renderUserBar() {
    const { session } = user;

    return (
      <div className="d-flex align-items-center gap-3">
        <Dropdown
          menu={{
            items: Object.entries(LanguageName).map(([key, label]) => ({
              key,
              label,
              onClick: () =>
                i18n.changeLanguage(key as keyof typeof LanguageName)
            }))
          }}
        >
          <TranslationOutlined className="text-white fs-4" />
        </Dropdown>

        <Dropdown
          menu={{
            items: [
              { key: 'exit', label: 'Exit', onClick: () => user.signOut() }
            ]
          }}
        >
          <Avatar src={session.avatar}>{session.account}</Avatar>
        </Dropdown>
      </div>
    );
  }

  render() {
    const { narrow, children } = this.props;

    return !user.session ? (
      this.renderSignIn()
    ) : (
      <Layout>
        <Layout.Header className="d-flex align-items-center justify-content-between">
          <a className="d-block h-100" href=".">
            <img
              className="me-3"
              style={{ height: '80%' }}
              src="https://github.com/ant-design.png"
            />
          </a>
          {this.renderLinks()}

          {this.renderUserBar()}
        </Layout.Header>

        <Layout.Content
          className="m-auto overflow-auto"
          style={{ width: narrow ? '90vw' : '100vw' }}
        >
          {children}
        </Layout.Content>

        <Layout.Footer className="text-center">
          ©2021-{new Date().getFullYear()}
          <a
            className="ms-2"
            target="_blank"
            href="https://idea2app.github.io/"
          >
            {t('powered_by')} idea2app
          </a>
        </Layout.Footer>
      </Layout>
    );
  }
}
