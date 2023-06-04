import { IDType } from 'mobx-restful';

export default {
  welcome: '歡迎',
  upstream_projects: '上游專案',
  home_page: '主頁',
  source_code: '源代碼',
  component: '元件',
  pagination: '分頁',
  powered_by: '強力驅動自',
  documentation: '文檔',
  learn: '學習',
  examples: '示例',
  deploy: '部署',

  sign_in: '登入',
  sign_out: '登出',

  // REST table
  create: '新增',
  submit: '提交',
  cancel: '取消',
  edit: '編輯',
  delete: '刪除',
  total_x_rows: ({ totalCount }: { totalCount: number }) =>
    `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
    `您確定刪除 ${keys.join('、')} 嗎？`,
  repository_name: '倉庫名',
  programming_language: '編程語言',
  topic: '話題',
  star_count: '星標數',

  // Scroll List
  scroll_list: '滾動列表',
  load_more: '加載更多……',
  no_more: '沒有更多'
} as const;
