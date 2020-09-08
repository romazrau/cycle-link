//使用套件 mssql
const sql = require('mssql');

// *資料庫連結設定檔 大家都把 sa 的密碼改成 everybodycanuse 才能一直用喔
const config = {
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

// 設計 SQL指令方法
const postlist = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `select  * from Community.tPost;`
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result)
        console.dir(result.recordset)
        console.dir(result.rowsAffected[0])
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return {
            result: 1,
            msg: "請求成功",
            data: result.recordset
        };
        // 錯誤處理
    } catch (err) {
        console.log(err);
        return {
            result: 0,
            msg: "SQL 錯誤",
            data: err
        };
    }
};


const postById = async (fid) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `select  *
        from  Community.tPost                           
        WHERE  fId  = ${fid}; `
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result)
        console.dir(result.recordset)
        console.dir(result.rowsAffected[0])
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return {
            result: 1,
            msg: "請求成功",
            data: result.recordset
        };
        // 錯誤處理
    } catch (err) {
        console.log(err);
        return {
            result: 0,
            msg: "SQL 錯誤",
            data: err
        };
    }
};


//直接測試用 func ， node src/SQL/test.js
// 解除註解，並把匯出方法註解才能用喔
// postlist();
// postById(1);


// *匯出方法 ， 多個方法包在{}裡， ex: {func1, func2}
module.exports = {
    postlist,
    postById
};