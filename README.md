# medcircle_test
Coding project for MedCircle

## Setup

### This is assuming you're on OSX and have Homebrew installed. If not, you'll have install it first.

1. Clone the repo.
2. Put the given `.env` file in the root of the project.
3. Navigate to the root folder and run `npm i` then `npm test`. If tests pass, skip to 6. If not, in the `.env` file edit `DATABASE_URL` to be `localhost`, then continue to 3.
4. If you do not have PostgreSQL installed, run `sh scripts/install.sh`. This will install it using Homebrew.
5. Navigate to the repo and run `npm run setup`. This will create a database called "medcircle-project". In that database a table called "articles" will be created.
6. Run `npm start` to start the server.
7. Navigate to localhost:3000/api/v1 for API instructions (you will need an `Authorization` header with the value `bearer {TOKEN}`).

#### Notes
* To disable the authentication comment out line 13 in `server/server.js`.
* `npm test` runs eslint and unit tests.
* `npm run drop-table` drops the article table.