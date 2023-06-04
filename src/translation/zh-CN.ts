import { IDType } from 'mobx-restful';

export default {
  welcome: '欢迎',
  upstream_projects: '上游项目',
  home_page: '主页',
  source_code: '源代码',
  component: '组件',
  pagination: '分页',
  powered_by: '强力驱动自',
  documentation: '文档',
  learn: '学习',
  examples: '示例',
  deploy: '部署',

  sign_in: '登入',
  sign_out: '登出',

  // REST table
  create: '新增',
  submit: '提交',
  cancel: '取消',
  edit: '编辑',
  delete: '删除',
  total_x_rows: ({ totalCount }: { totalCount: number }) =>
    `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
    `您确定删除 ${keys.join('、')} 吗？`,
  repository_name: '仓库名',
  programming_language: '编程语言',
  topic: '话题',
  star_count: '星标数',

  // Scroll List
  scroll_list: '滚动列表',
  load_more: '加载更多……',
  no_more: '没有更多'
} as const;
