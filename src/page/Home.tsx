import { Card, Col, Row } from 'antd';
import { observer } from 'mobx-react';
import { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-class-tools';

import project from '../model/Project';
import { i18n } from '../model/Translation';

const { t } = i18n;

@observer
class HomePage extends PureComponent<
  RouteComponentProps<{}, {}, { guest: string }>
> {
  componentDidMount() {
    project.getList(
      'facebook/react',
      'microsoft/TypeScript',
      'mobxjs/mobx',
      'ant-design/ant-design'
    );
  }

  componentWillUnmount() {
    project.clearList();
  }

  render() {
    const { guest } = this.props.query,
      { list } = project;

    return (
      <>
        <h1>{t('upstream_projects')}</h1>

        {guest && (
          <h2>
            {t('welcome')} {guest}!
          </h2>
        )}
        <Row gutter={16}>
          {list.map(({ name, logo, description }) => (
            <Col key={name} span={6}>
              <Card hoverable className="h-100" cover={<img src={logo} />}>
                <Card.Meta title={name} description={description} />
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

export default withRouter(HomePage);
