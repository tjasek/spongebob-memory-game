const mysql = require("mysql");

const connection = mysql.createPool({
  user: "root",
  password: "root",
  host: "localhost",
  database: "spongebob-memory",
  // here you can set connection limits and so on
});

module.exports = connection;
