# Thesis Backend

Tech: Express + TS + PostgreSQL + TypeORM + session-based auth

## Run

- `npm i`
- OR `npm i pg reflect-metadata typeorm uuid express-session connect-pg-simple envalid joi bcrypt` + `npm i -D @types/pg @types/express-session @types/connect-pg-simple @types/uuid @types/bcrypt`
- create an `.env` file
  - manually create `session` table in the database

## Explain

- any results that is not positive will be returned as SimpleError instead of the Response.json
  - the difference between SimpleError and Res.body is the `serverData` prop
- why not put `entity` under `features`: cause 1TM, MTM, 1T1 relationship
- why use `findBy` and `findOneBy`: cause only using `where` props, if use any others -> use `find`, etc
- [Entities should have name is DB lowercase](https://stackoverflow.com/a/55297938/8834000)

## Notes

- `express-session` will handles all the session stuff internally, pay attention to these
  - every request to BE will be given a session record + sid, but we only cared about session records that has user_id prop (cause that means Client === logged in User)
  - `express-session` will do below (you don't need to manually write code for those)
    - auto extract the Cookie header containing sid when receiving Request containing header Cookie
    - auto parse sid -> auto send it to Client
- choose `validator` + write raw validate + sanitize middlewares cause
  - ez understand
  - don't have any opinion on other libs (`class-validator` combo with TypeORM + `express-validator` as using Express)
- type guard literals typings
  - <https://stackoverflow.com/a/55850291/8834000>
  - and wtf is `formats[number]` ? what is `[number]` ?
- Cookie flag ~ Key-Pair Cookie ~ Key-Value Cookie in HTTP Header
- thinking about using resource params as sid or user_id, choose user_id for simplicity, but read somewhere this is bad design
- by default, every request to the server will have a sessionId (cause of `app.use(session())`, notices global scope/no specific routes); but only sessionId that saved inside the `session` table is what matters
  - not sure if correct
- [why not put session id in query params (and maybe also path variables ?)](https://stackoverflow.com/a/35090676/8834000)
- config folder: do not allow "" as acceptable value -> || not ??
- 11/05/2022
  - `/resource.repo.ts`: why `return await` -> benefit stack trace ?
  - updates TypeORM to use newer version: use DataSource, and TypeORM repo now return record | null
- 14/05/2022
  - may need to change stuff about `use()` and `all()`
  - <https://stackoverflow.com/a/17124938/8834000>
  - <https://stackoverflow.com/a/14126090/8834000>

## Critics

- [File structure should be functionality-based](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md)
  - simple implementation of N Layer Architecture
