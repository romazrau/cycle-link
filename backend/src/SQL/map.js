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



//登入
const map_GetAllActivity = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select a.fId,fActName,ML.fLabelName,fIntroduction ,fCoordinateX,fCoordinateY,fImgPath
        from Activity.tActivity as a
        left join Activity.tActivityMainLabel as ML
        on ML.fId=a.fActLabelId
        Where fActivityDate >GETDATE()
        `
        const result = await sql.query(sqlString);
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "帳號或密碼錯誤" }
        }
        return { result: 1, msg: "登入成功", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};

// map_GetAllActivity();


module.exports = { map_GetAllActivity };