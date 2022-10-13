require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD} = process.env

const config = { 
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "database_homework",
    "host": "node-database.coxlfrx4fdvf.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

module.exports = config