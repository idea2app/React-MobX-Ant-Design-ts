import { Form, FormProps, Input } from 'antd';
import { observer } from 'mobx-react';
import { DataObject, IDType, ListModel } from 'mobx-restful';
import { InputHTMLAttributes, PureComponent } from 'react';

export interface Field
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | 'title'
    | 'type'
    | 'required'
    | 'min'
    | 'max'
    | 'step'
    | 'minLength'
    | 'maxLength'
    | 'pattern'
  > {
  key?: string;
}

export interface RestFormProps<T extends DataObject>
  extends Omit<FormProps, 'id' | 'fields'> {
  id?: IDType;
  fields: Field[];
  store: ListModel<T>;
}

/**
 * A re-implement of {@link https://github.com/idea2app/MobX-RESTful-table/blob/master/source/RestForm.tsx}
 */
@observer
export class RestForm<T extends DataObject> extends PureComponent<
  RestFormProps<T>
> {
  componentDidMount() {
    const { store, id } = this.props;

    if (id) store.getOne(id);
  }

  render() {
    const { id, fields, store, ...props } = this.props;
    const { currentOne } = store;

    return (
      <Form {...props}>
        {fields.map(({ key, title, ...props }, index) => (
          <Form.Item key={key || index} label={title} labelCol={{ span: 6 }}>
            {(!id || currentOne[key]) && (
              <Input {...props} name={key} defaultValue={currentOne[key]} />
            )}
          </Form.Item>
        ))}
      </Form>
    );
  }
}
