# medcircle_test
Coding project for MedCircle

## Setup

### This is assuming you're on OSX and have Homebrew installed. If not, you'll have install PostgreSQL.

1. Clone the repo.
2. If you do not have PostgreSQL installed, run `sh scripts/install.sh`. This will install it using Homebrew.
3. Navigate to the repo and run `npm run setup`. This will create a database called "medcircle-project". In that database a table called "articles" will be created.
4. In your root, create a file called `.env`. In this file type in `SECRET_TOKEN={token}`, where `{token}`is the OAuth "bearer" token that was provided. (ie it should look something like `SECRET_TOKEN=123abc` ).
5. Run `npm start` to start the server.
6. Navigate to localhost:3000/v1 for API instructions