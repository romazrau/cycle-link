const sql = require("mssql");

const config = {
  user: "sa",
  password: "everybodycanuse",
  server: "localhost", // You can use 'localhost\\instance' to connect to named instance
  database: "SeaTurtleOnTheWay",

  options: {
    enableArithAbort: true,
    encrypt: true,
  },
  port: 1433,
};
