import { Col, Row } from 'antd';
import { ScrollList } from 'mobx-restful-table';

import { GitCard } from '../component/Git/Card';
import repositoryStore from '../model/Repository';
import { i18n } from '../model/Translation';

export const ScrollListPage = () => (
  <ScrollList
    translator={i18n}
    store={repositoryStore}
    renderList={allItems => (
      <Row gutter={[16, 16]}>
        {allItems.map(repository => (
          <Col xs={24} md={12} lg={6} key={repository.full_name}>
            <GitCard {...repository} />
          </Col>
        ))}
      </Row>
    )}
  />
);
