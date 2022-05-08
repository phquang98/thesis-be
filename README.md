# Thesis Backend

Tech: Express + TS + PostgreSQL + TypeORM + session-based auth

## Run

- `npm i`
- OR `npm i pg reflect-metadata typeorm uuid express-session connect-pg-simple` + `npm i -D @types/pg @types/express-session @types/connect-pg-simple @types/uuid`
- create an `.env` file
  - manually create `session` table in the database

## Explain

## Notes

- `express-session` will handles all the session stuff internally, pay attention to these
  - every request to BE will be given a session record + sid, but we only cared about session records that has user_id prop (cause that means Client === logged in User)
  - `express-session` will do below (you don't need to manually write code for those)
    - auto extract the Cookie header containing sid when receiving Request containing header Cookie
    - auto parse sid -> auto send it to Client
- [CHANGE ALL DATABASE NAME BACK TO LOWERCASE](https://stackoverflow.com/a/55297938/8834000)
- WHERE OR -> pass an array or perform a QueryBuilder
- choose `validator` + write raw validate + sanitize middlewares cause
  - ez understand
  - don't have any opinion on other libs (`class-validator` combo with TypeORM + `express-validator` as using Express)
- type guard literals typings
  - <https://stackoverflow.com/a/55850291/8834000>
  - and wtf is `formats[number]` ? what is `[number]` ?
- Cookie flag ~ Key-Pair Cookie ~ Key-Value Cookie in HTTP Header
- now using older version of TypeORM, they update to DataSource and deprecated createCXN, care when use
- thinking about using resource params as sid or user_id, choose user_id for simplicity, but read somewhere this is bad design
- by default, every request to the server will have a sessionId (cause of `app.use(session())`, notices global scope/no specific routes); but only sessionId that saved inside the `session` table is what matters
  - not sure if correct
- [why not put session id in query params (and maybe also path variables ?)](https://stackoverflow.com/a/35090676/8834000)
- config folder: do not allow "" as acceptable value -> || not ??

## Critics

- [File structure is functionality-based aka not good](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md)
  - Arguments: simple application atm
