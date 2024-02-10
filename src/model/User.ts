import { observable } from 'mobx';

export interface Passport {
  account: string;
  key: string;
}

export interface User extends Pick<Passport, 'account'> {
  avatar?: string;
}

const { localStorage: store } = globalThis;

export class UserModel {
  @observable
  accessor session: User | undefined =
    store['session'] && JSON.parse(store['session']);

  async signIn({ account, key }: Passport) {
    if (account !== 'admin' || key !== '19890604')
      throw new URIError("The key can't be forgotten!");

    this.session = {
      account,
      avatar: 'https://github.com/idea2app.png'
    };
    store['session'] = JSON.stringify(this.session);
  }

  signOut() {
    this.session = undefined;
    store.clear();
  }
}

export default new UserModel();
