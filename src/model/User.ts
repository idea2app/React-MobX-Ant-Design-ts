import { observable } from "mobx";

export interface Passport {
  account: string;
  key: string;
}

export interface User extends Pick<Passport, "account"> {
  avatar?: string;
}

const { localStorage: store } = globalThis;

export class UserModel {
  @observable
  session?: User = store["session"] && JSON.parse(store["session"]);

  signIn({ account }: Passport) {
    store["session"] = JSON.stringify((this.session = { account }));
  }

  signOut() {
    this.session = undefined;
    store.clear();
  }
}

export default new UserModel();
