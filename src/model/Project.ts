import { components } from '@octokit/openapi-types';
import { makeObservable, observable } from 'mobx';

import { request } from './service';

export type Project = components['schemas']['minimal-repository'] & {
  logo?: string;
};

export class ProjectModel {
  constructor() {
    makeObservable(this);
  }

  @observable
  list: Project[] = [];

  clearList() {
    this.list = [];
  }

  async getList(...names: string[]) {
    for (const name of names) {
      const data = await request<Project>(
        `https://api.github.com/repos/${name}`
      );
      const logo = await ProjectModel.getLogo(data.owner.login, data.name);

      this.list.push({ ...data, logo });
    }
    return this.list;
  }

  static async getLogo(owner: string, repo: string) {
    repo = repo.toLowerCase();
    try {
      return await new Promise<string>((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image.src);
        image.onerror = reject;

        image.src = `https://raw.githubusercontent.com/github/explore/master/topics/${repo}/${repo}.png`;
      });
    } catch {
      return `https://github.com/${owner}.png`;
    }
  }
}

export default new ProjectModel();
