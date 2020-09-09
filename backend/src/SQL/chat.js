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


//確認訪客在不在
const test = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select M.fId, M.fName , T.fAccountType as 'account type' , T.fAccountAuthority as 'account authority'
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId
        where fAccount = 'guest' AND fPassword = 'badiii7777';`
        const result = await sql.query(sqlString);
        console.dir(result)
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
};









module.exports = { test,};
