import { Space } from 'antd';
import { PureComponent } from 'react';

import { PageBox } from '../component/PageBox';
import { Column, RestTable } from '../component/RestTable';
import repositoryStore, { GitRepository } from '../model/Repository';

export class PaginationPage extends PureComponent {
  get columns(): Column<GitRepository>[] {
    return [
      { key: 'full_name' },
      { key: 'homepage', type: 'url' },
      { key: 'language' },
      {
        key: 'topics',
        render: (_, { topics }) => (
          <Space wrap>
            {topics.map(topic => (
              <small
                key={topic}
                className="d-inline-block rounded-pill bg-primary text-white px-3 py-1"
              >
                {topic}
              </small>
            ))}
          </Space>
        )
      },
      { key: 'stargazers_count' }
    ];
  }

  render() {
    return (
      <PageBox>
        <RestTable columns={this.columns} store={repositoryStore} />
      </PageBox>
    );
  }
}
