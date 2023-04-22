import { HTTPClient } from 'koajax';

export async function request<T>(path: string, method = 'GET') {
  return (await (await fetch(path, { method })).json()) as T;
}

const GithubToken = process.env.GITHUB_TOKEN;

export const service = new HTTPClient({
  baseURI: 'https://api.github.com/',
  responseType: 'json'
}).use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${GithubToken}`
    };
  return next();
});
