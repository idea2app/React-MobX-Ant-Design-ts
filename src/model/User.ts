import { clear } from 'idb-keyval';
import { observable } from 'mobx';
import { persist, restore } from 'mobx-restful';

export interface Passport {
  account: string;
  key: string;
}

export interface User extends Pick<Passport, 'account'> {
  avatar?: string;
}

export class UserModel {
  @persist()
  @observable
  accessor session: User | undefined;

  restored = restore(this, 'User');

  async signIn({ account, key }: Passport) {
    if (account !== 'admin' || key !== '19890604')
      throw new URIError("The key can't be forgotten!");

    return (this.session = {
      account,
      avatar: 'https://github.com/idea2app.png'
    });
  }

  signOut() {
    this.session = undefined;
    return clear();
  }
}

export default new UserModel();
