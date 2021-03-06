//使用套件 mssql
const sql = require('mssql');

// *資料庫連結設定檔 大家都把 sa 的密碼改成 everybodycanuse 才能一直用喔
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



const HomePageActivity = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `
                SELECT top(3) fId,fActName,fActivityDate,fImgPath,fInOut
                from Activity.tActivity
                where fActivityDate >GETDATE()
                order by fActivityDate asc
        
            `
        const result = await sql.query(sqlStr)
        // 看一下回傳結果

        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return { result: 1, msg: "請求成功", data: result.recordset };
        // 錯誤處理
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 錯誤", data: err };

    }
};
const HomePageActivityInOut = async (Wid) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr;
        if (Wid == '01' || Wid == '02' || Wid == '03' || Wid == '04' || Wid == '05' || Wid == '06') {
            sqlStr = `
                SELECT top(3) fId,fActName,fActivityDate,fImgPath,fInOut
                from Activity.tActivity
                where fActivityDate >GETDATE()
                order by fActivityDate asc
          `} 
          else {
            sqlStr = `
            SELECT top(3) fId,fActName,fActivityDate,fImgPath,fInOut
            from Activity.tActivity
            where fActivityDate >GETDATE() and fInOut ='室內'
            order by fActivityDate asc
            `
          }
            
        const result = await sql.query(sqlStr)
        // 看一下回傳結果

        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return { result: 1, msg: "請求成功", data: result.recordset };
        // 錯誤處理
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 錯誤", data: err };

    }
};



const HomePagerecentActivity = async (id) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `
        SELECT top(3) fId,fActName,fActivityDate,fImgPath,fInOut
        from Activity.tActivity
        where fActivityDate >GETDATE()
        ORDER BY NEWID()     
            `
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
    

        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return { result: 1, msg: "請求成功", data: result.recordset };
        // 錯誤處理
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 錯誤", data: err };

    }
};
const HomePageActivityImg = async (id) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `
        SELECT top(7) fId,fImgPath
        from Activity.tActivity
        where fActivityDate >GETDATE()
        ORDER BY NEWID()     
            `
        const result = await sql.query(sqlStr)
        // 看一下回傳結果


        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return { result: 1, msg: "請求成功", data: result.recordset };
        // 錯誤處理
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 錯誤", data: err };

    }
};


//先測試!!!!用 func (terminal>node src/SQL/test.js)
// 解除註解，並把匯出方法註解才能用喔
// HomePageActivityImg();


// *匯出方法 ， 多個方法包在{}裡， ex: {func1, func2}
module.exports = { HomePageActivity, HomePagerecentActivity, HomePageActivityImg,HomePageActivityInOut }