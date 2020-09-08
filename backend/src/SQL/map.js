const sql = require('mssql');

const config = {
    // user: 'sa',
    // password: 'P@ssw0rd',
    user: 'sa',
    password: 'everybodycanuse',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'SeaTurtleOnTheWay',

    options: {
        enableArithAbort: true,
        encrypt: true
    },
    port: 1433,
}



//登入
const map_GetAllActivity = async (account, password) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select a.fId,fActName,ML.fLabelName,fIntroduction ,fCoordinateX,fCoordinateY,fImgPath
        from Activity.tActivity as a
        left join Activity.tActivityMainLabel as ML
        on ML.fId=a.fActLabelId
        `
        const result = await sql.query(sqlString);
        console.dir(result);

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