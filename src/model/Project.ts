import { observable } from "mobx";
import { components } from "@octokit/openapi-types";

import { request } from "./service";

export type Repository = components["schemas"]["minimal-repository"];

export class ProjectModel {
  @observable
  list: Repository[] = [];

  async getList(...names: string[]) {
    for (const name of names) {
      const data = await request<Repository>(
        `https://api.github.com/repos/${name}`
      );
      this.list.push(data);
    }
    return this.list;
  }
}

export default new ProjectModel();
