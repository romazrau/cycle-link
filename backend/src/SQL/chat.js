const sql = require('mssql');

const config = {
    // user: 'sa',
    // password: 'P@ssw0rd',
    user: process.env.SQLSERVER_USER || 'sa',
    password: process.env.SQLSERVER_PASSWORD || 'everybodycanuse',
    server: process.env.SQLSERVER_SERVER || 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: process.env.SQLSERVER_DATABASE ||'SeaTurtleOnTheWay',
    options: {
        enableArithAbort: true,
        encrypt: true
      },
      port: parseInt(process.env.SQLSERVER_POST, 10) || 1433,
}



const myChatroomList = async (id) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select C.* , M.fName as 'fMember1Name', M2.fName as 'fMember2Name'
        from Chat.tChatroom as C
        left join Member.tMember as M
        on C.fMemberId1 = M.fId
        left join Member.tMember as M2
        on C.fMemberId2 = M2.fId
        where fMemberId1 = ${id} OR fMemberId2 = ${id};
        `;
        const result = await sql.query(sqlString);
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "趕快去找人聊天吧~" }
        }
        return { result: 1, msg: "你的聊天室來囉", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};









module.exports = { myChatroomList };
