import React, { PureComponent } from "react";
import { observer } from "mobx-react";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Card from "antd/es/card";

import { PageBox } from "../component/PageBox";
import project from "../model/Project";

@observer
export class HomePage extends PureComponent {
  componentDidMount() {
    project.getList(
      "facebook/react",
      "microsoft/TypeScript",
      "mobxjs/mobx",
      "ant-design/ant-design"
    );
  }

  render() {
    const { list } = project;

    return (
      <PageBox>
        <Row gutter={16}>
          {list.map(({ name, owner, description }) => (
            <Col key={name} span={6}>
              <Card
                hoverable
                style={{ height: "100%" }}
                cover={<img src={`https://github.com/${owner.login}.png`} />}
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
