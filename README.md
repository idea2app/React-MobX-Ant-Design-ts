# React-MobX-Ant-Design.ts

[React][1] project scaffold based on [TypeScript][2], [MobX][3] & [Ant Design][4],
which is inspired by [WebCell scaffold][5].

[![CI & CD](https://github.com/idea2app/React-MobX-Ant-Design-ts/actions/workflows/main.yml/badge.svg)][6]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][7]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][8]

## Technology stack

- Language: [TypeScript v5][2]
- Component engine: [React v18][1]
- State management: [MobX v6][3]
- Component suite: [Ant Design v5][4] + [Bootstrap v5][9] (CSS utilities)
- HTTP Client: [KoAJAX][10]
- PWA framework: [Workbox v7][11]
- Package bundler: [Parcel v2][12]
- CI / CD: GitHub [Actions][13] + [Pages][14]

## Extra components

1. [Badge](./src/component/Badge.tsx)
2. [Spinner](./src/component/Spinner.tsx)
3. [REST Form](./src/component/RestForm.tsx)
4. [REST Table](./src/component/RestTable.tsx)

## Best practice

1.  Install **[Settings][15] GitHub app** in your account or organization
2.  Click the **[Use this template][16] button** on the top of this GitHub repository's home page, then create your own repository in the app-installed namespace above
3.  Click the **[Open in GitHub codespaces][7] button** on the top of ReadMe file, then an **online VS Code development environment** will be started immediately
4.  Set [Vercel variables][17] as [Repository secrets][18], then every commit will get an independent **Preview URL**
5.  Recommend to add a [Notification step in GitHub actions][19] for your Team IM app
6.  Remind the PMs & users of your product to submit **Feature/Enhancement** requests or **Bug** reports with [Issue forms][20] instead of IM messages or Mobile Phone calls
7.  Collect all these issues into [Project kanbans][21], then create **Pull requests** & add `closes #issue_number` into its description for automation

## Development

```shell
npm i pnpm -g

pnpm i

npm start
```

## Deployment

```shell
pnpm build
```

[1]: https://react.dev/
[2]: https://www.typescriptlang.org/
[3]: https://mobx.js.org/
[4]: https://ant.design/
[5]: https://github.com/EasyWebApp/scaffold
[6]: https://github.com/idea2app/React-MobX-Ant-Design-ts/actions/workflows/main.yml
[7]: https://codespaces.new/idea2app/React-MobX-Ant-Design-ts
[8]: https://gitpod.io/?autostart=true#https://github.com/idea2app/React-MobX-Ant-Design-ts
[9]: https://getbootstrap.com/
[10]: https://github.com/EasyWebApp/KoAJAX
[11]: https://developers.google.com/web/tools/workbox
[12]: https://parceljs.org/
[13]: https://github.com/features/actions
[14]: https://pages.github.com/
[15]: https://github.com/apps/settings
[16]: https://github.com/new?template_name=React-MobX-Ant-Design-ts&template_owner=idea2app
[17]: https://github.com/idea2app/Next-Bootstrap-ts/blob/80967ed49045af9dbcf4d3695a2c39d53a6f71f1/.github/workflows/pull-request.yml#L9-L11
[18]: https://github.com/idea2app/React-MobX-Ant-Design-ts/settings/secrets/actions
[19]: https://github.com/kaiyuanshe/kaiyuanshe.github.io/blob/bb4675a56bf1d6b207231313da5ed0af7cf0ebd6/.github/workflows/pull-request.yml#L32-L56
[20]: https://github.com/idea2app/React-MobX-Ant-Design-ts/issues/new/choose
[21]: https://github.com/idea2app/React-MobX-Ant-Design-ts/projects
