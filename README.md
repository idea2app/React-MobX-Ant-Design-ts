# React-MobX-Ant-Design.ts

[React][1] project scaffold based on [TypeScript][2], [MobX][3] & [Ant Design][4],
which is inspired by [WebCell scaffold][5].

[![CI & CD](https://github.com/idea2app/React-MobX-Ant-Design-ts/actions/workflows/main.yml/badge.svg)][7]

## Technology stack

- Language: [TypeScript v5][2]
- Component engine: [React v18][1]
- State management: [MobX v6][3]
- Component suite: [Ant Design v5][4] + [Bootstrap v5][6] (CSS utilities)
- HTTP Client: [KoAJAX][8]
- PWA framework: [Workbox v7][9]
- Package bundler: [Parcel v2][10]
- CI / CD: GitHub [Actions][11] + [Pages][12]

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
[8]: https://github.com/EasyWebApp/KoAJAX
[9]: https://developers.google.com/web/tools/workbox
[10]: https://parceljs.org
[11]: https://github.com/features/actions
[12]: https://pages.github.com/
