# React-MobX-Ant-Design.ts

[React][1] project scaffold based on [TypeScript][2], [MobX][3] & [Ant Design][4],
which is inspired by [WebCell scaffold][5].

[![CI & CD](https://github.com/idea2app/React-MobX-Ant-Design-ts/actions/workflows/main.yml/badge.svg)][7]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][8]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][9]

## Technology stack

- Language: [TypeScript v5][2]
- Component engine: [React v18][1]
- State management: [MobX v6][3]
- Component suite: [Ant Design v5][4] + [Bootstrap v5][6] (CSS utilities)
- HTTP Client: [KoAJAX][10]
- PWA framework: [Workbox v7][11]
- Package bundler: [Parcel v2][12]
- CI / CD: GitHub [Actions][13] + [Pages][14]

## Extra components

1. [Badge](./src/component/Badge.tsx)
2. [Spinner](./src/component/Spinner.tsx)
3. [REST Form](./src/component/RestForm.tsx)
4. [REST Table](./src/component/RestTable.tsx)

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
[6]: https://getbootstrap.com/
[7]: https://github.com/idea2app/React-MobX-Ant-Design-ts/actions/workflows/main.yml
[8]: https://codespaces.new/idea2app/React-MobX-Ant-Design-ts
[9]: https://gitpod.io/?autostart=true#https://github.com/idea2app/React-MobX-Ant-Design-ts
[10]: https://github.com/EasyWebApp/KoAJAX
[11]: https://developers.google.com/web/tools/workbox
[12]: https://parceljs.org
[13]: https://github.com/features/actions
[14]: https://pages.github.com/
