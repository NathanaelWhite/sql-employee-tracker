const mysql = require("mysql2");

// Connect database
const db = mysql.createConnection(
    {
      host: "localhost",
      // Your MySQL username
      user: "root",
      // Your MySQL password
      password: "Nathanaelw99",
      database: "emptracker",
    },
    console.log("Connected to the emptracker database")
  );

  module.exports = db;