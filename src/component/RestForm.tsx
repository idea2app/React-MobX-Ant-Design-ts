import { Button, Form, FormProps, Input } from 'antd';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { DataObject, IDType, ListModel } from 'mobx-restful';
import { FormEvent, InputHTMLAttributes, Component } from 'react';
import { formToJSON } from 'web-utility';

import { Spinner } from './Spinner';

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
    | 'readOnly'
  > {
  key?: string;
}

export interface RestFormProps<T extends DataObject>
  extends Omit<FormProps, 'id' | 'fields'> {
  id?: IDType;
  translator: TranslationModel<string, 'submit' | 'cancel'>;
  store: ListModel<T>;
  fields: Field[];
}

/**
 * A re-implement of {@link https://github.com/idea2app/MobX-RESTful-table/blob/master/source/RestForm.tsx}
 */
@observer
export class RestForm<T extends DataObject> extends Component<
  RestFormProps<T>
> {
  componentDidMount() {
    const { store, id } = this.props;

    if (id) store.getOne(id);
  }

  componentWillUnmount() {
    this.props.store.clearCurrent();
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = formToJSON(event.currentTarget);

    console.log(data);
  };

  render() {
    const { id, fields, store, translator, ...props } = this.props;
    const { t } = translator,
      { downloading, currentOne } = store;

    return (
      <Form {...props} onSubmitCapture={this.handleSubmit}>
        {downloading > 0 ? (
          <Spinner />
        ) : (
          fields.map(({ key, title, ...props }, index) => (
            <Form.Item key={key || index} label={title} labelCol={{ span: 6 }}>
              <Input {...props} name={key} defaultValue={currentOne[key]} />
            </Form.Item>
          ))
        )}
        <footer className="d-flex justify-content-end gap-3">
          <Button htmlType="reset">{t('cancel')}</Button>
          <Button htmlType="submit" type="primary">
            {t('submit')}
          </Button>
        </footer>
      </Form>
    );
  }
}
