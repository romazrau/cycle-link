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
        // let sqlStr = `with act123 as(
        //     select top(6)  * from Activity.tActivity
        //     order by  newid()
        // ),jo as (
        //     select j.fActivityId,j.fMemberId
        //     from Activity.tJoinList as J
        // )
        // select A.* , J.*
        // from  act123 as A 
        // left join jo as J
        // on A.fId = J.fActivityId
        // `
        let sqlStr = `with a1 as(
            select s.*, a.fActLabelId
            from Activity.tSearchList as s 
            left join Activity.tActivity as a
            on s.fActivityId = a.fId
        ),b2 as(
            select b.fActLabelId,count(b.fMemberId) as c
            from a1 as b 
            group by b.fActLabelId
        ),c3 as  (
            select top(1) * 
            from b2
            order by c desc
        ),d4 as (
            select act.*
            from c3 as clab 
            left join Activity.tActivity as act 
            on clab.fActLabelId = act.fActLabelId
        )
        
        select top(6) *
        from d4
        where d4.fActivityDate > convert(char, getdate(), 111)
        order by newid()`
        // todo where j.fMemberId = ${}

        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result.recordset)
        // console.log("============");
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return {
            result: 1,
            msg: "請求成功",
            data: result.recordset
        };
        // 錯誤處理
    } catch (err) {
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
        var sqlStr = "";
        if (fid != 7) {
            sqlStr = `
        select A.fId, A.fActName , A.fActivityDate,A.fActivityEndDate , A.fImgPath,A.fActLocation
        from Activity.tActivity as A 
        left join Activity.tActivityMainLabel as S
        on A.fActLabelId = S.fId
        where S.fId = ${fid} and A.fActName like '%${text}%';`

        } else {
            sqlStr = `
            select A.fId, A.fActName , A.fActivityDate,A.fActivityEndDate , A.fImgPath,A.fActLocation
            from Activity.tActivity as A 
            left join Activity.tActivityMainLabel as S
            on A.fActLabelId = S.fId
            where A.fActName like '%${text}%';`
        }
        const result = await sql.query(sqlStr)
        // console.log("searchgo")
        // 看一下回傳結果'
        // console.dir(result)
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        //    console.log("-------------------",result)
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
const activeforyousql = async (fMemberId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // console.log(fMemberId)
        // console.log("===============================");
        let sqlStr
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        if(fMemberId==2){
            sqlstr=`with a1 as(
                select top(6) a.fActivityId ,count(a.fMemberId) as b 
                from Activity.tSearchList as a
                group by a.fActivityId
                order by b desc
            ),b2 as (
                select c.fActivityId ,ac.*
                from a1 as c
                left join Activity.tActivity as ac
                on c.fActivityId = ac.fId
            )
            select *
            from b2     `
        }else{
            sqlStr = `
        with SAct AS (	
            select s.* 	from Activity.tSearchList as s
            where s.fMemberId=${fMemberId}
        ), Act AS (
            select A.fId , A.fActLabelId
            from Activity.tActivity as A 
        ), countACT as(
        select count(a.fMemberId) as am ,b.fActLabelId
        from SAct as a 
        left join Act as b 
        on a.fActivityId = b.fId 
        group by b.fActLabelId
        ), Maxlabel as (
        select max(countACT.am) as c
        from countACT
        ), MaxlabelID as (

        select  c.fActLabelId
        from Maxlabel as d
        left join countACT as c
        on d.c = c.am
        )
        ,Labelreult as (
        select a.*
        from MaxlabelID as e
        left join Activity.tActivity as A 
        on A.fActLabelId = e.fActLabelId
        )
        select top(6) f.*
        from Labelreult as f
        WHERE fId NOT IN(
        select fActivityId
        from Activity.tSearchList
        where fMemberId=${fMemberId}) and  f.fActivityDate > convert(char, getdate(), 111) 
        order by  newid()
        `
        }
             

        // console.log("ooooooooo",sqlStr);

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
            select  S.*, A.fActName,A.fActLocation,A.fImgPath,A.fActivityDate
            from Activity.tSearchList as S 
            left join Activity.tActivity as A 
            on A.fId = S.fActivityId
            where S.fMemberId = ${id}
            ), mylist as (
            select fActivityId,fJoinTypeId 
            from Activity.tJoinList 
            where fMemberId = ${id}
        )
            select top(6) S.*, J.fJoinTypeId  
            from active123 as S
            LEFT JOIN  mylist  as J
            on  S.fActivityId  = J.fActivityId
            order by S.fId desc; `

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

        let sqlstr1 = `select *
        from Activity.tSearchList 
        where fMemberId = ${fMemberId} and fActivityId = ${fActivityId}`

        const searchresult = await sql.query(sqlstr1)


        if (searchresult.recordset[0]) {
            return {
                result: 0,
                msg: "had"
            };
        }


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

const removeactlikesql = async (fActivityId, fMemberId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        DELETE FROM Activity.tJoinlist
        WHERE fActivityId=${fActivityId} AND fMemberId=${fMemberId}
        `;
        const result = await sql.query(sqlString);
        // console.dir(result);

        return {
            result: 1,
            msg: "刪除成功",
            data: result.recordset
        };
    } catch (err) {
        return {
            result: 0,
            msg: "SQL 問題",
            data: err
        };
    }
};
/*-------------------------*/
const likeListSQL = async (fJoinTypeId, fMemberId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        SELECT * FROM Activity.tJoinlist
        WHERE fJoinTypeId=${fJoinTypeId} AND fMemberId=${fMemberId}
        `;
        const result = await sql.query(sqlString);
        // console.dir(result);

        return {
            result: 1,
            msg: " 查詢成功",
            data: result.recordset
        };
    } catch (err) {
        console.log(err);
        return {
            result: 0,
            msg: "SQL 問題",
            data: err
        };
    }
};



const getActByCommunityId = async (id) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select fId, fActName, fActivityDate, fActivityEndDate
        from Activity.tActivity
        where fCommunityId = ${id}
        `;
        const result = await sql.query(sqlString);

        if (result.recordset[0]) {
            return {
                result: 1,
                msg: "搜尋成功",
                data: result.recordset
            };
        }

        return {
            result: 0,
            msg: "查無結果"
        };
    } catch (err) {
        console.log(err);
        return {
            result: 0,
            msg: "SQL 問題",
            data: err
        };
    }
};



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
    addActLikeTosql,
    removeactlikesql,
    likeListSQL,
    getActByCommunityId
};