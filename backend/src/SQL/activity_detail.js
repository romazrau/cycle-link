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
const ActDetail = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `
            select a.*
            from Activity.tActivity as a 
            `
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        // console.dir(result)
        // console.dir(result.recordset)
        // console.dir(result.rowsAffected[0])
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



const ActDetailById = async (fid) => {
    try {
        await sql.connect(config)
        let sqlStr = `WITH act as (
            select a.*, m.fName as MemberName, m.fPhotoPath
            from Activity.tActivity as a 
            LEFT JOIN Member.tMember as m
            on a.fMemberId = m.fId
            where a.fid = ${fid}
            ),
            act2 as (
            select act.*, am.fLabelName as ActCategory
            from act
            LEFT JOIN Activity.tActivityMainLabel as am
            on act.fActLabelId = am.fId
            ),
            act3 as (
            select act2.*, asta.fStatusName as ActStatus
            from act2
            LEFT JOIN Activity.tActivityType as asta
            on act2.fActTypeId = asta.fId
            ),act4 as (
            select act3.*, Actlv.fAttestName as ActLV,Actlv.fPayCoin
            from act3
            LEFT JOIN Activity.tAttestType as Actlv
            on act3.fActAttestId = Actlv.fId
            )
            select act4.*, Com.fName as CommuntyName, Com.fImgPath as CommuntyImgPath
            from act4
            LEFT JOIN Community.tCommunity as Com
            on act4.fCommunityId = Com.fId;
            `
        const result = await sql.query(sqlStr)
        return {
            result: 1,
            msg: "請求成功",
            data: result.recordset
        };
    } catch (err) {
        console.log(err);
        return {
            result: 0,
            msg: "SQL 錯誤",
            data: err
        };
    }
};



const TagById = async (fid) => {
    try {
        await sql.connect(config)
        let sqlStr = `select  lb.*,tActivityLabel.fLabelName
        from  Activity.tActivityHadLabel as lb
        LEFT JOIN Activity.tActivityLabel
        on lb.fActivityLabelId = tActivityLabel.fId
        WHERE  fActivityId  = ${fid}`
        const result = await sql.query(sqlStr)
        return {
            result: 1,
            msg: "請求成功",
            data: result.recordset
        };
    } catch (err) {
        console.log(err);
        return {
            result: 0,
            msg: "SQL 錯誤",
            data: err
        };
    }
};

const JoinById = async (fid) => {
    try {
        await sql.connect(config)
        let sqlStr = `WITH joinList as (
            select top(5) jl.*,tMember.fName,fPhotoPath
            from Activity.tJoinList as jl
            LEFT JOIN Member.tMember
            on jl.fMemberId = tMember.fId
            WHERE fActivityId = ${fid})
            select joinList.*, tJoinType.fJoinName
            from joinList
            LEFT JOIN Activity.tJoinType
            on joinList.fJoinTypeId = tJoinType.fId`
        const result = await sql.query(sqlStr)
        return {
            result: 1,
            msg: "請求成功",
            data: result.recordset
        };
    } catch (err) {
        console.log(err);
        return {
            result: 0,
            msg: "SQL 錯誤",
            data: err
        };
    }
};


const JoinCount = async (fid) => {
    try {
        await sql.connect(config)
        let sqlStr = `select list.fActivityId, COUNT(list.fMemberId) as JoinCount
        from Activity.tJoinList as list
        WHERE fActivityId = ${fid}
        GROUP BY list.fActivityId`
        const result = await sql.query(sqlStr);
        // console.dir(result.recordset)
        return {
            result: 1,
            msg: "請求成功",
            data: result.recordset
        };
    } catch (err) {
        console.log(err);
        return {
            result: 0,
            msg: "SQL 錯誤",
            data: err
        };
    }
};




//* ----------------------- 新增活動 ----------------------- //

const creatAct = async (fActName, fCreatDate, fActivityDate, fActivityEndDate, fMemberId, fIntroduction, fImgPath, fActLabelId, fMaxLimit, fMinLimit, fActAttestId, fActTypeId, fActLocation) => {
    try {
        await sql.connect(config)
        let sqlStr = `
        insert into Activity.tActivity
        (fActName, fCreatDate, fActivityDate, fActivityEndDate, fMemberId, fIntroduction, fImgPath, fActLabelId, fMaxLimit, fMinLimit, fActAttestId, fActTypeId, fActLocation)
    values ('${fActName}', '${fCreatDate}','${fActivityDate}', '${fActivityEndDate}', ${fMemberId}, '${fIntroduction}', '${fImgPath}', ${fActLabelId}, ${fMaxLimit}, ${fMinLimit}, ${fActAttestId},${fActTypeId},'${fActLocation}')`
        const result = await sql.query(sqlStr)
        // console.dir(result)
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return {
            result: 1,
            msg: "請求成功"
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
// ActDetail(2);
// ActDetailById(1);
// TagById(1);
// JoinById(1);
// JoinCount(1);

// *匯出方法 ， 多個方法包在{}裡， ex: {func1, func2}
module.exports = {
    ActDetail,
    ActDetailById,
    TagById,
    JoinById,
    JoinCount,
    creatAct
};