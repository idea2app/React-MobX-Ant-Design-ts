import { EditOutlined } from '@ant-design/icons';
import { Button, Modal, Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
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

  componentDidMount() {
    this.props.store.getList({}, 1);
  }

  closeEditor = () => (this.editingId = undefined);

  get columns(): Column<T>[] {
    const { columns, store, editable } = this.props;

    return [
      ...columns.map(
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
      ),
      editable && {
        key: 'edit',
        render: (_, { [store.indexKey]: ID }) => (
          <Button onClick={() => (this.editingId = ID)}>
            <EditOutlined />
          </Button>
        )
      }
    ];
  }

  renderDialog() {
    const { store } = this.props,
      { columns, editingId } = this;
    const editing = this.editingId != null,
      currentTitle = store.currentOne[store.indexKey];

    return (
      <Modal
        title={currentTitle}
        open={editing}
        onOk={this.closeEditor}
        onCancel={this.closeEditor}
      >
        {editing && <RestForm id={editingId} fields={columns} store={store} />}
      </Modal>
    );
  }

  render() {
    const { store, ...props } = this.props;
    const { downloading, pageSize, pageIndex, totalCount, currentPage } = store;

    return (
      <>
        <header className="d-flex justify-content-end">
          <Button type="primary" onClick={() => (this.editingId = 0)}>
            +
          </Button>
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
        />
        {this.renderDialog()}
      </>
    );
  }
}
