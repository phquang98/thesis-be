# Template Backend Pure

Last updated: 30/12/2021
Tech: TS + Express

## Run

- `npm i`
- `npm run build`: let `tsc` compile Node server in TS to JS, and compile again detect changes in `/src`
- `npm start`: build a Node server using `nodemon`
- remember install `.d.ts` files for any libraries with `npm i -D @types/yourLibHere`

## Replicate

- clone this repo + del `package.json` & `lock` -> `npm init --yes` -> add code below

```json

"name": "template-be-pure",
"version": "1.0.0",
"description": "Template Backend",

"engines": {
  "node": ">=8.0.0"
},

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "tsc -w",
  "start": "nodemon dist/app.js"
},

,
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "./src/**/*.ts": [
      "npx eslint --max-warnings 100 --cache --fix",
      "npx prettier --write"
    ],
    "./src/app.ts": [
      "npx eslint --max-warnings 100 --cache --fix",
      "npx prettier --write"
    ]
  }
```

- `npm i dotenv express`
- `npm i -D @types/express @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser cors @types/cors eslint eslint-config-prettier eslint-plugin-import eslint-plugin-node eslint-plugin-prettier husky@4.3.8 lint-staged nodemon @types/morgan morgan prettier typescript`

## Notes

- just realize pino and pino-pretty is just data loggings, not request loggings, and express-pino-logger too young atm, revert back to using morgan
