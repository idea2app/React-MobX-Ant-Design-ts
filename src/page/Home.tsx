import { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-class-tools';
import Row from 'antd/es/grid/row';
import Col from 'antd/es/grid/col';
import Card from 'antd/es/card';

import { PageBox } from '../component/PageBox';
import project from '../model/Project';

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
      <PageBox narrow>
        <h1>Upstream projects</h1>

        {guest && <h2>Welcome {guest}!</h2>}

        <Row gutter={16}>
          {list.map(({ name, logo, description }) => (
            <Col key={name} span={6}>
              <Card
                hoverable
                style={{ height: '100%' }}
                cover={<img src={logo} />}
              >
                <Card.Meta title={name} description={description} />
              </Card>
            </Col>
          ))}
        </Row>
      </PageBox>
    );
  }
}

export default withRouter(HomePage);
