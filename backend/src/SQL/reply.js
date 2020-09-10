const sql = require("mssql");

const config = {
  // user: 'sa',
  // password: 'P@ssw0rd',
  user: process.env.SQLSERVER_USER || "sa",
  password: process.env.SQLSERVER_PASSWORD || "everybodycanuse",
  server: process.env.SQLSERVER_SERVER || "localhost", // You can use 'localhost\\instance' to connect to named instance
  database: process.env.SQLSERVER_DATABASE || "SeaTurtleOnTheWay",
  options: {
    enableArithAbort: true,
    encrypt: true,
  },
  port: parseInt(process.env.SQLSERVER_POST, 10) || 1433,
};

const AddReply = async (fPostId, fContent, fReplyMemberId) => {
  try {
    await sql.connect(config);
    const str = `INSERT INTO Community.tReply(fPostId, fContent, fReplyMemberId, fReplyTime)
    VALUES (${fPostId}, '${fContent}', ${fReplyMemberId}, CURRENT_TIMESTAMP)`;
    const result = sql.query(str);

    console.dir(result);
    return { result: 1, msg: "新增成功", data: result.recordset };
  } catch (err) {
    console.log(err);
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

module.exports = { AddReply };
