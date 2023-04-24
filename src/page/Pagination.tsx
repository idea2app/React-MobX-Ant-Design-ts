import { Space } from 'antd';
import { PureComponent } from 'react';

import { Badge } from '../component/Badge';
import { PageBox } from '../component/PageBox';
import { Column, RestTable } from '../component/RestTable';
import repositoryStore, { GitRepository } from '../model/Repository';

export class PaginationPage extends PureComponent {
  get columns(): Column<GitRepository>[] {
    return [
      {
        key: 'full_name',
        render: (_, { html_url, full_name }) => (
          <a target="_blank" href={html_url} rel="noreferrer">
            {full_name}
          </a>
        )
      },
      { key: 'homepage', type: 'url' },
      { key: 'language' },
      {
        key: 'topics',
        render: (_, { topics }) => (
          <Space wrap>
            {topics.map(topic => (
              <Badge
                key={topic}
                target="_blank"
                href={`https://github.com/topics/${topic}`}
              >
                {topic}
              </Badge>
            ))}
          </Space>
        )
      },
      { key: 'stargazers_count', type: 'number' }
    ];
  }

  render() {
    return (
      <PageBox>
        <RestTable
          editable
          deletable
          columns={this.columns}
          store={repositoryStore}
          onCheck={console.log}
        />
      </PageBox>
    );
  }
}
