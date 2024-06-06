import { observable } from 'mobx';
import { GitRepository } from 'mobx-github';

import { repositoryStore } from './service';

export interface Project extends GitRepository {
  logo?: string;
}

export class ProjectModel {
  @observable
  accessor list: Project[] = [];

  clearList() {
    this.list = [];
    repositoryStore.clear();
  }

  async getList(...names: string[]) {
    for (const name of names) {
      const data = await repositoryStore.getOne(name);
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
