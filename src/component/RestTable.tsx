import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space, Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { DataObject, IDType, ListModel } from 'mobx-restful';
import { PureComponent } from 'react';

import { Field, RestForm } from './RestForm';

export type Column<T extends DataObject> = Omit<ColumnType<T>, 'key'> & Field;

export interface RestTableProps<T extends DataObject>
  extends Omit<TableProps<T>, 'columns'> {
  columns: Column<T>[];
  store: ListModel<T>;
  editable?: boolean;
  deletable?: boolean;
  onCheck?: (IDs: T[keyof T][]) => any;
}

/**
 * A re-implement of {@link https://github.com/idea2app/MobX-RESTful-table/blob/master/source/RestTable.tsx}
 */
@observer
export class RestTable<T extends DataObject> extends PureComponent<
  RestTableProps<T>
> {
  @observable
  editingId?: IDType;

  @observable
  checkedKeys: T[keyof T][] = [];

  componentDidMount() {
    this.props.store.getList({}, 1);
  }

  componentWillUnmount() {
    this.props.store.clear();
  }

  closeEditor = () => (this.editingId = undefined);

  get fields(): Column<T>[] {
    return this.props.columns.map(
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

  get columns(): Column<T>[] {
    const { store, editable, deletable } = this.props;

    return [
      ...this.fields,

      (editable || deletable) && {
        key: 'edit',
        render: (_, { [store.indexKey]: ID }) => (
          <Space>
            {editable && (
              <Button onClick={() => (this.editingId = ID)}>
                <EditOutlined />
              </Button>
            )}
            {deletable && (
              <Button onClick={() => this.delete([ID])}>
                <DeleteOutlined />
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

  async delete(IDs: T[keyof T][]) {
    await new Promise((onOk, onCancel) =>
      Modal.confirm({ content: IDs.join(), onOk, onCancel })
    );
    for (const ID of IDs) await this.props.store.deleteOne(ID);

    message.success('√');
  }

  renderDialog() {
    const { store } = this.props,
      { fields, editingId } = this;
    const currentTitle = store.currentOne[store.indexKey];

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
          {...{ fields, store }}
          onReset={this.closeEditor}
        />
      </Modal>
    );
  }

  render() {
    const { columns, store, editable, deletable, onCheck, ...props } =
      this.props;
    const checkable = deletable || typeof onCheck === 'function',
      { downloading, pageSize, pageIndex, totalCount, currentPage } = store;

    return (
      <>
        <header className="d-flex justify-content-end gap-3 py-3">
          <Button type="primary" onClick={() => (this.editingId = 0)}>
            +
          </Button>
          {deletable && (
            <Button
              className="bg-danger text-white"
              disabled={!this.checkedKeys.length}
              onClick={() => this.delete(this.checkedKeys)}
            >
              x
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
