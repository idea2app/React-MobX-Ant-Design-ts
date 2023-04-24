import { Space } from 'antd';
import { observer } from 'mobx-react';
import { PureComponent } from 'react';

import { Badge } from '../component/Badge';
import { Column, RestTable } from '../component/RestTable';
import repositoryStore, { GitRepository } from '../model/Repository';
import { i18n } from '../model/Translation';

const { t } = i18n;

@observer
export class PaginationPage extends PureComponent {
  get columns(): Column<GitRepository>[] {
    return [
      {
        key: 'full_name',
        title: t('repository_name'),
        render: (_, { html_url, full_name }) => (
          <a target="_blank" href={html_url} rel="noreferrer">
            {full_name}
          </a>
        )
      },
      { key: 'homepage', title: t('home_page'), type: 'url' },
      { key: 'language', title: t('programming_language') },
      {
        key: 'topics',
        title: t('topic'),
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
      { key: 'stargazers_count', title: t('star_count'), type: 'number' }
    ];
  }

  render() {
    return (
      <RestTable
        editable
        deletable
        translator={i18n}
        store={repositoryStore}
        columns={this.columns}
        onCheck={console.log}
      />
    );
  }
}
