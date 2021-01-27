
## Project setup

### Lucky Shine API (Express)
- After checking out project, please follow below steps:

#### Setup project environment
- create *.env* files specific to environment (.env, .env.test, .env.staging, .env.prod, etc)
  - *.env* (must exist with below variables)
    - PORT=7000 (you can use any available ports on your machine)
    - TOKEN_SECRET=1CR0NQl9sMOrpjqIB9tDNvsRVqExU1uY8VtmdPL3efKpKug1627igPPwtd17C (you can use any unique secert which will be required for generating JWT while authentication process)

#### Dependency Installation > `npm install` [Make sure you have install node & npm manager in your machine: https://nodejs.org/en/download/]

- It will install all required dependencies (defined in package.json) required to run this application.

#### Database setup
- To setup database, please create database at your server & make relevant config changes in below file:

##### `/config/config.json`
```
  "development": {
    "username": "root",
    "password": "root",
    "database": "lucky_shine_dev",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }  
```
##### Database migration & seeder commands
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all

#### API Testing > `npm test`
- It will run all the prepared unit tests & give you the outcome of executed test cases (`test/unit/*`)


#### Project Build > `npm start`
- You can access below API's at below endpoints (after your server base path like: http://localhost:7000)
  - Login: `/api/v1/auth`
  - Find Treasures: `/api/v1/treasures`
  - Claim Treasure: `/api/v1/treasures/claim`


