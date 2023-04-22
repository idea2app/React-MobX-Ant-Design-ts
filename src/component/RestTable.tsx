import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { observer } from 'mobx-react';
import { DataObject, ListModel } from 'mobx-restful';
import { HTMLInputTypeAttribute, PureComponent } from 'react';

export interface Column<T extends DataObject> extends ColumnType<T> {
  type?: HTMLInputTypeAttribute;
}

export interface RestTableProps<T extends DataObject>
  extends Omit<TableProps<T>, 'columns'> {
  columns: Column<T>[];
  store: ListModel<T>;
}

/**
 * A re-implement of {@link https://github.com/idea2app/MobX-RESTful-table/blob/master/source/RestTable.tsx}
 */
@observer
export class RestTable<T extends DataObject> extends PureComponent<
  RestTableProps<T>
> {
  componentDidMount() {
    this.props.store.getList({}, 1);
  }

  get columns(): ColumnType<T>[] {
    return this.props.columns.map(
      ({ key, dataIndex = key, type, title = key, render, ...column }) => ({
        ...column,
        key,
        dataIndex,
        title,
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

  render() {
    const { store, ...props } = this.props;
    const { downloading, pageSize, pageIndex, totalCount, currentPage } = store;

    return (
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
    );
  }
}
