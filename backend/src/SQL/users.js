const sql = require('mssql');

const config = {
    // user: 'sa',
    // password: 'P@ssw0rd',
    user: 'sa',
    password: 'everybodycanuse',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'SeaTurtleOnTheWay',
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

//登入
const login = async (account, password) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select M.fId, M.fName , T.fAccountType as 'fAccountType' , T.fAccountAuthority as 'fAccountAuthority'
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId
        where fAccount = '${account}' AND fPassword = '${password}';`
        const result = await sql.query(sqlString);
        console.dir(result);

        if( ! result.rowsAffected[0]) {
            return {result:0, msg:"帳號或密碼錯誤"}
        }
        return {result:1, msg:"登入成功", data:result.recordset[0]};
    } catch (err) {
        console.log(err);
        return {result:0, msg:"SQL 問題", data:result};
    }
};




module.exports = {test, login};