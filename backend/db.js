const mysql = require("mysql");

function createConnection() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jjtheej123",
    database: "health",
  });
  return connection;
}

module.exports = createConnection;
