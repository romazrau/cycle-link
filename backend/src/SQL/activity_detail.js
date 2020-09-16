const {
    text
} = require('express');
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

//* ----------------------- 寫入活動 BY ID ----------------------- //
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
            on joinList.fJoinTypeId = tJoinType.fId
            order by fId desc`
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


//* ----------------------- 標籤搜尋 ----------------------- //

const TagSearch = async (tag) => {
    try {
        await sql.connect(config)
        let sqlStr = `WITH act as (
            select tActivity.fId, fActName, fActivityDate,fActLocation,fImgPath, fActivityLabelId
            from Activity.tActivity
            LEFT JOIN Activity.tActivityHadLabel
            on tActivity.fId = tActivityHadLabel.fActivityId
            )
            select act.*,tActivityLabel.fLabelName
            from act
            LEFT JOIN Activity.tActivityLabel
            on act.fActivityLabelId = tActivityLabel.fId
            where fLabelName like '%${tag}%'
            `
        const result = await sql.query(sqlStr);
        console.dir(result.recordset)
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
// TagSearch('#守護海洋')

//* ----------------------- 參加活動 ----------------------- //
const JoinAct = async (fActivityId, fMemberId, fJoinTime, fJoinTypeId) => {
    try {
        await sql.connect(config)
        let sqlStr = `insert into Activity.tJoinList(fActivityId, fMemberId, fJoinTime, fJoinTypeId)
        values (${fActivityId},${fMemberId},'${fJoinTime}',${fJoinTypeId})`

        // console.log(sqlStr);

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


//* ----------------------- 取消參加活動 ----------------------- //
const CancelJoinAct = async (fActivityId, fMemberId) => {
    try {
        await sql.connect(config)
        let sqlStr = `delete from Activity.tJoinList
        where fActivityId = ${fActivityId} and fMemberId = ${fMemberId}`

        // console.log(sqlStr);

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

//* ----------------------- 判斷是否參加活動 ----------------------- //
const OrJoinAct = async (fActivityId, fMemberId) => {
    try {
        await sql.connect(config)
        let sqlStr = `select fActivityId, fMemberId
        from Activity.tJoinList
        where fActivityId = ${fActivityId} and fMemberId = ${fMemberId}`

        // console.log(sqlStr);

        const result = await sql.query(sqlStr);
        // console.log("============");
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

//* ----------------------- 判斷是否為活動發起者 ----------------------- //
const OrActInitiator = async (fActivityId, fMemberId) => {
    try {
        await sql.connect(config)
        let sqlStr = `select fid, fActName, fMemberId
        from Activity.tActivity
        where fid = ${fActivityId} and fMemberId = ${fMemberId}`

        // console.log(sqlStr);

        const result = await sql.query(sqlStr);
        // console.log("============");
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
/*--------------判斷是否按過愛心-------------- */
const likechecked = async (fActivityId, fMemberId) => {
    try {
        await sql.connect(config)
        let sqlStr = `select * from Activity.tJoinList
        where fActivityId =${fActivityId} and fMemberId=${fMemberId} and fJoinTypeId=0
        `
        const result = await sql.query(sqlStr);


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


//* ----------------------- 創建活動 ----------------------- //
// ----- 新增多個標籤 ----- //

// // [待修正] ----- 只有一個標籤會錯誤 map is not a function ----- //
// 待測試 ↑

// 新增 1~5 個標籤
const CreateTag5 = (x) => {
    let result = ""
    console.log("Tag5===" + typeof (x))
    if (typeof (x) == 'string') {
        result = `insert into Activity.tActivityLabel (fLabelName)
    values ('${x}')`
    } else {
        x.map((e, index) => {
            result += `insert into Activity.tActivityLabel (fLabelName)
    values ('${e}')`
        })
    }
    return result;
}
// 新增 1~5 HadLabel
const CreateHadTag5 = (actId, labId) => {
    let result = ""
    result = `insert into Activity.tActivityHadLabel(fActivityId,fActivityLabelId)
        values (${actId},${labId})`
    return result;
}
// 尋找相同tag名稱
const findTagName = (x) => {
    let result = ""
    x.map((e, index) => {
        result += `select fId,fLabelName
    from Activity.tActivityLabel
    where fLabelName = '${e}'`
    })
    return result;
}



// TODO: [待修正] ----- 沒選擇社團會傳入undefined ----- //
const createAct = async (fActName, fCreatDate, fActivityDate, fActivityEndDate, fMemberId, fIntroduction, fImgPath, fActLabelId, fMaxLimit, fMinLimit, fActAttestId, fActTypeId, fActLocation, fLabelName, fCommunityId) => {
    try {
        await sql.connect(config)
        let sqlStr = `
        insert into Activity.tActivity(fActName, fCreatDate, fActivityDate, fActivityEndDate, fMemberId, fIntroduction, fImgPath, fActLabelId, fMaxLimit, fMinLimit, fActAttestId, fActTypeId, fActLocation,fCommunityId)
        values ('${fActName}', '${fCreatDate}','${fActivityDate}', '${fActivityEndDate}', ${fMemberId}, '${fIntroduction}', '${fImgPath}', ${fActLabelId}, ${fMaxLimit}, ${fMinLimit}, ${fActAttestId},${fActTypeId},'${fActLocation}',${fCommunityId});
        ${CreateTag5(fLabelName)}`
        console.log(sqlStr);
        const result = await sql.query(sqlStr)
        // console.dir(result)
        let findActID = `select fId,fActName
        from Activity.tActivity
        where fActName = '${fActName}'`
        let findLabId = findTagName(fLabelName)
        // console.log("活動ID+名稱====" + findLabId)
        const result2 = await sql.query(findActID)
        // console.log("result2=====", result2)
        const result3 = await sql.query(findLabId)
        // console.log("result3=====", result3)
        // console.log("活動ID::::::" + result2.recordset[0].fId);
        // console.log("標籤ID::::::result3", result3.recordset[0]);
        // console.log("標籤ID::::::result3", result3.recordsets[1]);
        // console.log("標籤ID::::::result3---0---", result3.recordsets[0][0].fId);
        // console.log("標籤ID::::::result3---1---", result3.recordsets[1][0].fId);


        let actId = result2.recordset[0].fId
        let labelId = result3.recordsets
        let resultHadLab = ""
        for (let i = 0; i < result3.recordsets.length; i++) {
            resultHadLab += CreateHadTag5(actId, labelId[i][0].fId)
        }

        const result4 = await sql.query(resultHadLab)
        console.log("resultHadLab=====" + resultHadLab)

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
// fActName, fCreatDate, fActivityDate, fActivityEndDate, fMemberId, fIntroduction, fImgPath, fActLabelId, fMaxLimit, fMinLimit, fActAttestId, fActTypeId, fActLocation, fLabelName, fCommunityId
// createAct('Label_TEST_123', '2020-09-01', '2020-10-01 08:00', '2020-10-01 10:00', 6, 'introduction', '', 0, 50, 10, 3, 1, 'taipei', '#label23', 1)

//* ----------------------- 創建活動 以個人或社團 ----------------------- //
const actCreaterType = async (fMemberId) => {
    try {
        await sql.connect(config)
        let sqlStr = `
        select fCommunityId, fMemberId, fAccessRightId,tCommunity.fName
from Community.tMemberList
LEFT JOIN Community.tCommunity
on tMemberList.fCommunityId = tCommunity.fId
where fAccessRightId=3 and fMemberId=${fMemberId}`
        const result = await sql.query(sqlStr)
        // console.log(sqlStr);
        // console.dir(result.recordset)
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return {
            result: 1,
            msg: "請求成功",
            data: result.recordset // 顯示結果
        };
        // 錯誤處理
    } catch (err) {
        console.log(err);
        return {
            result: 0,
            msg: "SQL 錯誤",
            data: err.message
        };
    }
};

//* TODO: ----------------------- 創建活動 讓標籤隸屬在活動底下 ----------------------- //
const createActTagAll = async (fActivityId, fActivityLabelId) => {
    try {
        await sql.connect(config)
        let sqlStr = `
        insert into Activity.tActivityHadLabel(fActivityId,fActivityLabelId)
values (${fActivityId},${fActivityLabelId})`
        console.log(sqlStr);
        const result = await sql.query(sqlStr)
        console.dir(result)
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

//* ----------------------- 編輯活動 ----------------------- //
const EditAct = async (fId, fActName, fIntroduction, fMinLimit, fMaxLimit, fCommunityId) => {
    try {
        await sql.connect(config)
        let sqlStr = `
            update Activity.tActivity
            set fActName = '${fActName}', fIntroduction = '${fIntroduction}',fMinLimit=${fMinLimit},fMaxLimit=${fMaxLimit},fCommunityId=${fCommunityId}
            where fId=${fId}`
        console.log(sqlStr);
        const result = await sql.query(sqlStr)
        // console.dir(result)
        return {
            result: 1,
            msg: "請求成功",
            // data: result.recordset
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

// EditAct('SQL___test2')





//直接測試用 func ， node src/SQL/test.js
// 解除註解，並把匯出方法註解才能用喔
// ActDetail(2);
// ActDetailById(1);
// TagById(1);
// JoinById(1);
// JoinCount(1);
// TagSearch(2020)
// OrJoinAct(1, 6)
// actCreaterType()

// *匯出方法 ， 多個方法包在{}裡， ex: {func1, func2}
module.exports = {
    ActDetail,
    ActDetailById,
    TagById,
    JoinById,
    JoinCount,
    createAct,
    TagSearch,
    JoinAct,
    CancelJoinAct,
    OrJoinAct,
    actCreaterType,
    OrActInitiator,
    EditAct,
    likechecked,
};