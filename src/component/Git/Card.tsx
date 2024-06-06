import { Button, Card, Space } from 'antd';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { FC } from 'react';

import { i18n } from '../../model/Translation';
import { Badge } from '../Badge';
import { GitLogo } from './Logo';

export const GitCard: FC<GitRepository> = observer(
  ({ full_name, language, description, topics, homepage }) => (
    <Card
      className="h-100 mb-3"
      actions={[
        <Button target="_blank" href={homepage}>
          {i18n.t('home_page')}
        </Button>
      ]}
    >
      <Card.Meta
        avatar={language && <GitLogo name={language} />}
        title={full_name}
        description={description}
      />
      <Space className="mt-3" wrap>
        {topics?.map(topic => <Badge key={topic}>{topic}</Badge>)}
      </Space>
    </Card>
  )
);
