# microfront-base

vite based microfrontend with single-spa

## How to develop

```bash

yarn --cwd nested build
yarn --cwd vue-app build
yarn --cwd shell dev
```

Deploy to netlify

```
cd shell
yarn build
netlify deploy --prod -d dist 
```

## Arch

- shell: single-spa host
- nested: react-router app
- vue-app: vue-router app

## Philosophy

- Use shared `ApplicationProps`

## LICENSE

MIT