//使用套件 mssql
const sql = require('mssql');

// *資料庫連結設定檔 大家都把 sa 的密碼改成 everybodycanuse 才能一直用喔
const config = {
    // user: 'sa',
    // password: 'P@ssw0rd',
    user: process.env.SQLSERVER_USER || 'sa',
    password: process.env.SQLSERVER_PASSWORD || 'everybodycanuse',
    server: process.env.SQLSERVER_SERVER || 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: process.env.SQLSERVER_DATABASE || 'SeaTurtleOnTheWay',
    options: {
        enableArithAbort: true,
        encrypt: true
    },
    port: parseInt(process.env.SQLSERVER_POST, 10) || 1433,
}

// 設計 SQL指令方法
const activesql = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `select top(6)* from Activity.tActivity as A 
        left join  Activity.tJoinList as J 
        on j.fMemberId = A.fMemberId
        where j.fMemberId = 3`
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result)
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

//類別搜尋
const activemainlevelsql = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `select  * from Activity.tActivityMainLabel order by fId desc`
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result)
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

const activegosearchsql = async (fid, text) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `
        select A.fId, A.fActName , A.fActivityDate,A.fActivityEndDate , A.fImgPath,A.fActLocation
        from Activity.tActivity as A 
        left join Activity.tActivityMainLabel as S
        on A.fActLabelId = S.fId
        where S.fId = ${fid} and A.fActName like '%${text}%';`
        const result = await sql.query(sqlStr)
        console.log("searchgo")
        // 看一下回傳結果'
        // console.dir(result)
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
//為您推薦
const activeforyousql = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `select top(6) * from Activity.tActivity as A 
        where A.fImgPath is not null
        order by newid() `
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result)
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
}

//進階搜尋城市
// const activesearchcitysql = async () => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         // 連接資料庫
//         await sql.connect(config)
//         // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
//         let sqlStr = `select A.fActLocation  from Activity.tActivity as A `
//         const result = await sql.query(sqlStr)
//         // 看一下回傳結果
//         console.dir(result)
//         // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
//         return {result:1, msg:"請求成功", data:result.recordset};
//     // 錯誤處理
//     } catch (err) {
//         console.log(err);
//         return {result:0, msg:"SQL 錯誤", data:err};
//     }
// };

//todo 進階搜尋

const activesearchdetailsql = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `select A.fId, A.fActName , A.fActivityDate,A.fActivityEndDate , A.fImgPath,A.fActLocation
        from Activity.tActivity as A 
        left join Activity.tActivityMainLabel as S
        on A.fActLabelId = S.fId
        where S.fId = ${fid} and A.fActName like '%${text}%'; `
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result)
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

// 瀏覽過的活動

const activeseensql = async (id) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `WITH active123 AS (  
            select  S.*, A.fActName,A.fActLocation,A.fImgPath 
            from Activity.tSearchList as S 
            left join Activity.tActivity as A 
            on A.fId = S.fActivityId
            where S.fMemberId = ${id}
            ), mylist as (
            select fActivityId,fJoinTypeId 
            from Activity.tJoinList 
            where fMemberId = ${id}
        )
            select top(6) S.*, J.*  
            from active123 as S
            LEFT JOIN  mylist  as J
            on  S.fActivityId  = J.fActivityId; `

        // todo  登入功能可使用時需換成判斷id where S.fMemberId = ${id}
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result)
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

//寫入
//todo
const activeinsertseensql = async (fActivityId, fMemberId, fSearchTime) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `INSERT INTO Activity.tSearchList( fActivityId , fMemberId , fSearchTime) 
        VALUES (${fActivityId},${fMemberId},'${fSearchTime}')
        `;

        // todo  
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result)
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

//新增活動進我的興趣

const addActLikeTosql = async (fActivityId, fMemberId, fJoinTime, fJoinTypeId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `INSERT INTO Activity.tJoinList(fActivityId ,fMemberId ,fJoinTime,fJoinTypeId) 
        VALUES (${fActivityId},${fMemberId},'${fJoinTime}','${fJoinTypeId}')
        `;

        // todo  
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        console.dir(result)
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

//

//直接測試用 func ， node src/SQL/test.js
// 解除註解，並把匯出方法註解才能用喔
// mySqlFunc();


// *匯出方法 ， 多個方法包在{}裡， ex: {func1, func2}
module.exports = {
    activesql,
    activemainlevelsql,
    activegosearchsql,
    activeseensql,
    activeinsertseensql,
    activeforyousql,
    addActLikeTosql
};