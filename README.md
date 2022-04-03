# Thesis Backend

## Notes

- `npm i pg reflect-metadata typeorm uuid express-session connect-pg-simple` + `npm i -D @types/pg @types/express-session @types/connect-pg-simple @types/uuid`
- create an `.env` file + test connect to local postgresql ok
  - manually create `session` table in the database
- `x` denotes custom stuffs written in this project, not from any 3rd libs
- [CHANGE ALL DATABASE NAME BACK TO LOWERCASE](https://stackoverflow.com/a/55297938/8834000)
- WHERE OR -> pass an array or perform a QueryBuilder
- choose `validator` + write raw validate + sanitize middlewares cause
  - ez understand
  - don't have any opinion on other libs (`class-validator` combo with TypeORM + `express-validator` as using Express)
- type guard literals typings
  - <https://stackoverflow.com/a/55850291/8834000>
  - and wtf is `formats[number]` ? what is `[number]` ?
- Cookie flag ~ Key-Pair Cookie ~ Key-Value Cookie in HTTP Header
