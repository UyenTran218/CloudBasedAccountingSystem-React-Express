var mysql = require("mysql");

var con = mysql.createPool({
  host: "database-2.c0aqxhlpbqtb.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "AccountingSystem1",
  database: "AccountingSystem",
});

module.exports = con;
