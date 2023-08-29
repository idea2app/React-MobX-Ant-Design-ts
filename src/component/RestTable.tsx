import { Button, Modal, Space, Table, TableProps, message } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import { computed, makeObservable, observable } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { observePropsState } from 'mobx-react-helper';
import { DataObject, IDType, ListModel } from 'mobx-restful';
import { PureComponent } from 'react';

import { Field, RestForm, RestFormProps } from './RestForm';

export type Column<T extends DataObject> = Omit<ColumnType<T>, 'key'> & Field;

export interface RestTableProps<T extends DataObject>
  extends Omit<TableProps<T>, 'columns'> {
  translator: RestFormProps<T>['translator'] &
    TranslationModel<
      string,
      'create' | 'edit' | 'delete' | 'total_x_rows' | 'sure_to_delete_x'
    >;
  store: ListModel<T>;
  columns: Column<T>[];
  editable?: boolean;
  deletable?: boolean;
  onCheck?: (IDs: T[keyof T][]) => any;
}

/**
 * A re-implement of {@link https://github.com/idea2app/MobX-RESTful-table/blob/master/source/RestTable.tsx}
 */
@observer
@observePropsState
export class RestTable<T extends DataObject> extends PureComponent<
  RestTableProps<T>
> {
  constructor(props: RestTableProps<T>) {
    super(props);
    makeObservable(this);
  }

  declare observedProps: RestTableProps<T>;

  @observable
  editingId?: IDType = undefined;

  @observable
  checkedKeys: T[keyof T][] = [];

  componentDidMount() {
    this.props.store.getList({}, 1);
  }

  componentWillUnmount() {
    this.props.store.clear();
  }

  closeEditor = () => (this.editingId = undefined);

  @computed
  get fields(): Column<T>[] {
    return this.observedProps.columns.map(
      ({ key, dataIndex = key, type, title = key, render, ...column }) => ({
        ...column,
        key,
        dataIndex,
        title,
        type,
        render:
          render ||
          (value =>
            type === 'url' ? (
              <a target="_blank" href={value}>
                {value}
              </a>
            ) : (
              value
            ))
      })
    );
  }

  @computed
  get columns(): Column<T>[] {
    const { store, translator, editable, deletable } = this.observedProps;
    const { t } = translator;

    return [
      ...this.fields,

      (editable || deletable) && {
        key: 'edit',
        render: (_, { [store.indexKey]: ID }) => (
          <Space>
            {editable && (
              <Button
                className="bg-warning"
                onClick={() => (this.editingId = ID)}
              >
                {t('edit')}
              </Button>
            )}
            {deletable && (
              <Button
                className="bg-danger text-white"
                onClick={() => this.delete([ID])}
              >
                {t('delete')}
              </Button>
            )}
          </Space>
        )
      }
    ];
  }

  handleCheck: TableRowSelection<T>['onChange'] = (_, list) => {
    const { store, onCheck } = this.props;

    this.checkedKeys = list.map(({ [store.indexKey]: ID }) => ID);

    onCheck?.(this.checkedKeys);
  };

  async delete(keys: T[keyof T][]) {
    const { translator, store } = this.props;

    if (!confirm(translator.t('sure_to_delete_x', { keys }))) return;

    for (const ID of keys) await store.deleteOne(ID);

    message.success('√');
  }

  renderDialog() {
    const { id, store, translator } = this.props,
      { fields, editingId } = this;
    const { t } = translator;

    const currentTitle = `${id ? t('edit') : t('create')} ${
      store.currentOne[store.indexKey] || ''
    }`;

    return (
      <Modal
        destroyOnClose
        title={currentTitle}
        open={editingId != null}
        footer={null}
        onCancel={this.closeEditor}
      >
        <RestForm
          id={editingId}
          {...{ fields, store, translator }}
          onReset={this.closeEditor}
        />
      </Modal>
    );
  }

  render() {
    const { columns, store, editable, deletable, onCheck, ...props } =
      this.props;

    const checkable = deletable || typeof onCheck === 'function',
      { t } = this.props.translator,
      { downloading, pageSize, pageIndex, totalCount = 0, currentPage } = store;

    return (
      <>
        <header className="d-flex align-items-center gap-3 py-3">
          <span className="me-auto">{t('total_x_rows', { totalCount })}</span>

          <Button type="primary" onClick={() => (this.editingId = 0)}>
            {t('create')}
          </Button>
          {deletable && (
            <Button
              className="bg-danger text-white"
              disabled={!this.checkedKeys.length}
              onClick={() => this.delete(this.checkedKeys)}
            >
              {t('delete')}
            </Button>
          )}
        </header>
        <Table
          {...props}
          columns={this.columns}
          rowKey={store.indexKey.toString()}
          loading={downloading > 0}
          pagination={{
            pageSize,
            current: pageIndex,
            total: totalCount,
            onChange: (page, pageSize) => store.getList({}, page, pageSize)
          }}
          dataSource={currentPage}
          rowSelection={
            checkable
              ? { type: 'checkbox', onChange: this.handleCheck }
              : undefined
          }
        />
        {this.renderDialog()}
      </>
    );
  }
}
