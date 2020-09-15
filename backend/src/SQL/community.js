//使用套件 mssql
const sql = require("mssql");
const { clearScreenDown } = require("readline");

// *資料庫連結設定檔 大家都把 sa 的密碼改成 everybodycanuse 才能一直用喔
const config = {
  // user: 'sa',
  // password: 'P@ssw0rd',
  user: process.env.SQLSERVER_USER || "sa",
  password: process.env.SQLSERVER_PASSWORD || "everybodycanuse",
  server: process.env.SQLSERVER_SERVER || "localhost", // You can use 'localhost\\instance' to connect to named instance
  database: process.env.SQLSERVER_DATABASE || "SeaTurtleOnTheWay",
  options: {
    enableArithAbort: true,
    encrypt: true,
  },
  port: parseInt(process.env.SQLSERVER_POST, 10) || 1433,
};

//"後端路由"透過Function對資料庫下的指令:CRUD增刪查改
//後端路由的變化影響SQL function參數的接收

//** 查詢所有社團
const communityList = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    // 連接資料庫
    await sql.connect(config);
    // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
    let sqlStr = `select * from Community.tCommunity
        where fStatusId != 0;`;
    const result = await sql.query(sqlStr);
    // 看一下回傳結果
    // console.dir(result);

    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "查無結果" };
    }
    // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
    return { result: 1, msg: "請求成功", data: result.recordset };
    // 錯誤處理
  } catch (err) {
    console.log(err);
    return { result: 0, msg: "SQL 錯誤", data: err };
  }
};

//log看資料
//  (async () => {
//     let result = await communityList();
//      console.log("-------------------------------result");
//     //  console.log(result);
// })()

//** 社團名稱(可部分)查詢社團
const communityByString = async (fName) => {
  try {
    // 連接資料庫
    await sql.connect(config);

    let sqlStr = `
        with 
        Community as
        (
        select C.fId,
               C.fImgPath,
               C.fName,
               C.fInfo,
               S.fId as fStatusId,
               S.fName as fSatusName
        from Community.tCommunity as C
        LEFT JOIN Community.tStatus as S
        ON C.fStatusId = S.fId 
        WHERE  C.fName like  '%${fName}%' and C.fStatusId != 0
        ),
        
        MemberList as
        (
        select MemberList.fCommunityId, COUNT(MemberList.fMemberId) as 'totalNumber'
        from Community.tMemberList as MemberList
        GROUP BY MemberList.fCommunityId
        )
        
        select Community.*, MemberList.totalNumber
        
        from Community as Community
        left join MemberList as MemberList
         on Community.fId = MemberList.fCommunityId;`;

    const result = await sql.query(sqlStr);

    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "查無結果" };
    }
    return { result: 1, msg: "請求成功", data: result.recordset };
  } catch (err) {
    console.log(err);
    return { result: 0, msg: "SQL 錯誤", data: err };
  }
};

//** 社團名稱(全對)查詢社團
const communityByFullString = async (fName) => {
  try {
    // 連接資料庫
    await sql.connect(config);

    let sqlStr = `
        with 
        Community as
        (
        select C.fId,
               C.fImgPath,
               C.fName,
               C.fInfo,
               S.fId as fStatusId,
               S.fName as fSatusName
        from Community.tCommunity as C
        LEFT JOIN Community.tStatus as S
        ON C.fStatusId = S.fId 
        WHERE  C.fName like  '${fName}' and C.fStatusId != 0
        ),
        
        MemberList as
        (
        select MemberList.fCommunityId, COUNT(MemberList.fMemberId) as 'totalNumber'
        from Community.tMemberList as MemberList
        GROUP BY MemberList.fCommunityId
        )
        
        select Community.*, MemberList.totalNumber
        
        from Community as Community
        left join MemberList as MemberList
         on Community.fId = MemberList.fCommunityId;`;

    const result = await sql.query(sqlStr);

    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "查無結果" };
    }
    return { result: 1, msg: "請求成功", data: result.recordset };
  } catch (err) {
    console.log(err);
    return { result: 0, msg: "SQL 錯誤", data: err };
  }
};

//** 會員Id查詢社團(ex.會員頁面用)
const searchByMemberId = async (fid) => {
  try {
    await sql.connect(config);

    let sqlStr = `with Community 
        as
        (
        select CM.fId,
               CM.fCommunityId,
               CM.fMemberId,
               CM.fAccessRightId,
               C.fImgPath as fImgPath,
               C.fDate as fDate,
               C.fName as fName
        from Community.tMemberList as CM
        left join Community.tCommunity C
        on CM.fCommunityId = C.fId
        )

        select Community.* ,
               Member.fName as fMemberName,
               Member.fPhotoPath as fPhotoPath
        from  Community as Community
        left join Member.tMember as Member
        on Community.fMemberId = Member.fId
        where Member.fId = ${fid}
        
        ;`;

    const result = await sql.query(sqlStr);
    // 結果看上
    // console.log("+++++++++++++++++++++++++++++++++");
    // console.log(result);

    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "查無結果" };
    }
    return { result: 1, msg: "請求成功", data: result.recordset };
  } catch (err) {
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

//** 會員Id加入社團
const communityAddByMemberId = async (
  fCommunityId,
  fMemberId,
  fDate,
  fAccessRightId
) => {
  try {
    await sql.connect(config);

    let sqlStr = `
        INSERT INTO Community.tMemberList(fCommunityId, fMemberId , fJoinDate , fAccessRightId)  
        VALUES ( ${fCommunityId}, ${fMemberId} ,${fDate} , ${fAccessRightId})
        ;`;
    const result = await sql.query(sqlStr);

    // console.log("+++++++++++++++++++++++++++++++");
    // console.log(result.rowsAffected[0]);

    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "查無結果" };
    }
    return { result: 1, msg: "請求成功", data: result };
  } catch (err) {
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

//** 會員Id and 社團Id 查詢成員是否在此社團
const searchMemInCom = async (fMemberManagerId, fCommunityId) => {
  try {
    await sql.connect(config);

    let sqlStr = `select *
        from Community.tMemberList
        where fCommunityId = ${fCommunityId}  and fMemberId = ${fMemberManagerId}                             
        `;
    const result = await sql.query(sqlStr);
    if (!result.recordset[0]) {
      return { result: 0, msg: "查無結果" };
    }

    // if(result.recordset[0]) => 沒東西就會是undefined
    //   {
    //     fId: 1,
    //     fCommunityId: 1,
    //     fMemberId: 10,
    //     fJoinDate: '2020/4/16',
    //     fAccessRightId: 3
    //   }

    return { result: 1, msg: "查詢成功", data: result.recordset[0] };
  } catch (err) {
    console.dir(err);
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

//** 社團Id查詢社團
//(傳給特定路由去使用)
const communityById_communityDetail = async (fid) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    // 連接資料庫
    await sql.connect(config);
    // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔

    let sqlStr = `with 
        Community as
        (
        select C.fId,
               C.fImgPath,
               C.fName,
               C.fInfo,
               S.fId as fStatusId,
               S.fName as fSatusName
        from Community.tCommunity as C
        LEFT JOIN Community.tStatus as S
        ON C.fStatusId = S.fId 
        WHERE  C.fId = ${fid} and fStatusId !=0
        ),
        
        MemberList as
        (
        select MemberList.fCommunityId, COUNT(MemberList.fMemberId) as 'totalNumber'
        from Community.tMemberList as MemberList
        GROUP BY MemberList.fCommunityId
        )
        
        select Community.*, MemberList.totalNumber
        
        from Community as Community
        left join MemberList as MemberList
         on Community.fId = MemberList.fCommunityId;`;

    const result = await sql.query(sqlStr);

    // console.log(result);

    //如果沒撈到資料的錯誤處理
    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "查無結果" };
    }
    // 看一下回傳結果
    // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
    return { result: 1, msg: "請求成功", data: result.recordset };
    // 錯誤處理
  } catch (err) {
    console.log(err);
    return { result: 0, msg: "SQL 錯誤", data: err };
  }
};

//** 社團id查詢社團管理員
const communityById_communityManager = async (fid) => {
  try {
    // 連接資料庫
    await sql.connect(config);

    //以免停權社團管理員顯示
    let sqlStrPrevent = `select * from Community.tCommunity
        where fId=${fid} and fStatusId != 0`;
    const resultPrevent = await sql.query(sqlStrPrevent);
    if (!resultPrevent.recordset[0]) {
      return { result: 0, msg: "無此社團,無法查詢管理員" };
    }

    let sqlStr = `with 
        v_Community
        as(
        select MemberList.fMemberId
              ,MemberList.fAccessRightId
        from Community.tMemberList as MemberList
        where fCommunityId = ${fid} and fAccessRightId = 3
        ),
        v_getCommunitytAccessRight
        as(
        select v_Community.fMemberId,
               CommunitytAccessRight.fName 
        from  v_Community as v_Community
        LEFT JOIN  Community.tAccessRight as CommunitytAccessRight
        on v_Community.fAccessRightId = CommunitytAccessRight.fId 
        )
        
        select  MembertMember.fId,
                MembertMember.fName,
                MembertMember.fPhotoPath	       
        from v_getCommunitytAccessRight as v_getCommunitytAccessRight
        LEFT JOIN Member.tMember as MembertMember
        on v_getCommunitytAccessRight.fMemberId = MembertMember.fId
        `;

    const result = await sql.query(sqlStr);
    //如果沒撈到資料的錯誤處理
    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "查無結果" };
    }
    // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
    return { result: 1, msg: "請求成功", data: result.recordset };
  } catch (err) {
    return { result: 0, msg: "SQL 錯誤", data: err };
  }
};

//** 社團id查詢社員
const communityById_communityMember = async (fid) => {
  try {
    // 連接資料庫
    await sql.connect(config);

    //以免停權社團管理員顯示
    let sqlStrPrevent = `select * from Community.tCommunity
         where fId=${fid} and fStatusId != 0`;
    const resultPrevent = await sql.query(sqlStrPrevent);
    if (!resultPrevent.recordset[0]) {
      return { result: 0, msg: "無此社團,無法查詢社員" };
    }

    let sqlStr = `
        select CommunitytMemberList.fMemberId,
       CommunitytMemberList.fJoinDate,
       MembertMember.fName,
	   MembertMember.fPhotoPath
       
from Community.tMemberList as  CommunitytMemberList
LEFT JOIN Member.tMember as MembertMember
on MembertMember.fId = CommunitytMemberList.fMemberId
where CommunitytMemberList.fCommunityId = ${fid}
        `;

    const result = await sql.query(sqlStr);
    // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
    //如果沒撈到資料的錯誤處理
    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "查無結果" };
    }
    return { result: 1, msg: "請求成功", data: result.recordset };
  } catch (err) {
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

//**新增社團
//驗證社團名稱 : 不可為空值 / 不可重複
const communityCreate = async (fName, fStatusId, fImgPath, fInfo, fDate) => {
  try {
    await sql.connect(config);

    //不可為空值: if (!fName) rerutn
    if (fName) {
      //不可重複:
      //從SQL查詢是否有相同的名稱結果放到變數sqlStrName
      //用sql.query(sqlStrName)回傳一個物件放入restult1
      //抓result1物件的屬性 recordset,如果為空值代表沒有相同的社團名稱被查詢 return
      let sqlStrName = `select fName from Community.tCommunity 
            where fName = '${fName}'`;
      const result1 = await sql.query(sqlStrName);
      if (result1.recordset[0]) {
        return { result: 0, msg: "錯誤:重複社團名稱" };
      }

      let sqlStr = `
            INSERT INTO Community.tCommunity( fName,fStatusId,fImgPath,fInfo,fDate)  
             VALUES ( '${fName}','${fStatusId}','${fImgPath}','${fInfo}','${fDate}');`;
      console.log(sqlStr);

      const result = await sql.query(sqlStr);

      return { result: 1, msg: "請求成功" };
    } else {
      return { result: 0, msg: "錯誤:沒有社團名稱" };
    }
  } catch (err) {
    console.log(err);
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

// todo routes還沒做
//**加入社團by社員id 社團id
// fAccessRightId為審核中
const communityAdd = async (fId, fCommunityId, fDate) => {
  try {
    await sql.connect(config);

    let sqlStr = `
            INSERT INTO Community.tMemberList( fCommunityId,fMemberId,fJoinDate,fAccessRightId)  
             VALUES ( ${fCommunityId},${fId},'${fDate}','1')
             `;
    // console.log(sqlStr);

    const result = await sql.query(sqlStr);

    return { result: 1, msg: "請求成功" };
  } catch (err) {
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

//** 修改社員身份by社員id 社團id
// 審核會員fAccessRightId = 2
const ChangeMemberAccessRight = async (fId, fCommunityId) => {
  try {
    await sql.connect(config);

    let sqlStr = `
        UPDATE Community.tMemberList
        SET fAccessRightId = 2
        WHERE fMemberId = ${fId} and fCommunityId = ${fCommunityId}
             `;
    // console.log(sqlStr);

    const result = await sql.query(sqlStr);
    

    return {
      result: 1,
      msg: "請求成功",
    };
  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err,
    };
  }
};


//** 搜尋待審核社員 by社員id 社團id
const SearchMemberAccessRight = async (fCommunityId) => {
  try {
    await sql.connect(config);

    let sqlStr = `
       SELECT l.*, m.fName, m.fPhotoPath
       FROM Community.tMemberList as l
       left join Member.tMember as m
       on l.fMemberId = m.fId
       where l.fAccessRightId = 1 and l.fCommunityId = ${fCommunityId};
             `;
    // console.log(sqlStr);

    const result = await sql.query(sqlStr);

    // console.log(result);
    if (result.rowsAffected[0]) {
      return {
        result: 1,
        msg: "請求成功",
        data: result.recordset
      }
    }

    return {
      result: 0,
      msg: "查無結果"
    }


  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    }
  }
}

//**刪除社團:用社員fId設定fStatus停權
//!會員頁面按解散社團
//把fId設定fStatus停權
const communityDelet = async (fId) => {
  try {
    await sql.connect(config);

    //id查詢社團,如果沒有RETURN
    let sqlStr = `select * 
        from Community.tCommunity
        where fId = ${fId}`;
    const result = await sql.query(sqlStr);

    // if(result.recordset[0]) => 沒東西就會是undefined
    // console.dir(result.recordset[0]);
    if (!result.recordset[0]) {
      return { result: 0, msg: "無法刪除,沒有此社團" };
    }

    let sqlStrtCommunity = `
        UPDATE Community.tCommunity
        SET fStatusId=0
        WHERE fId = ${fId}      
        `;
    const result1 = await sql.query(sqlStrtCommunity);

    return { result: 1, msg: "請求成功" };
  } catch (err) {
    console.dir(err);
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

// TODO  修改tCommunity資料by社團id
//　自己可以更新自己社團同名
const updateCommunity = async (
  fCommunityId,
  fName,
  fInfo,
  fStatusId,
  fImgPath
) => {
  try {
    await sql.connect(config);

    let sqlStr = `UPDATE Community.tCommunity
        SET fName = '${fName}', fInfo = '${fInfo}', fStatusId = ${fStatusId}, fImgPath='${fImgPath}' 
        WHERE fId = ${fCommunityId}`;
    console.log(sqlStr);

    const result = await sql.query(sqlStr);

    // if(result.recordset[0]) => 沒東西就會是undefined
    // console.dir(result.recordset[0]);
    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "無法更改,沒有此社團" };
    }

    return { result: 1, msg: "請求成功" };
  } catch (err) {
    console.dir(err);
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

// !前端抓fCommunityId
// TODO 刪除tMemberList資料by社員id,社團id CONTINUE
// 社團12做測試
const deletMemberOfCommunity = async (fId, fCommunityId) => {
  try {
    await sql.connect(config);

    // 字串處理  '1,2,3'
    let arrayId = fId.split(","); // [1 , 2 , 3]
    let arrayStr = arrayId.map((e) => `fMemberId = ${e}`); // [ 'fMemberId = 1' ,'fMemberId =  2 ', 'fMemberId = 3']
    let StrFin = arrayStr.join(" or "); // 'fMemberId = 1  or  fMemberId =  2   or  fMemberId = 3'
    // console.log(StrFin);

    let sqlStr = `DELETE FROM Community.tMemberList
        WHERE ( ${StrFin} ) and  fCommunityId = ${fCommunityId}                               
        `;

    const result = await sql.query(sqlStr);

    // console.log(result);
    // if(result.recordset[0]) => 沒東西就會是undefined
    // console.dir(result.recordset[0]);
    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "無法刪除" };
    }
    // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

    return { result: 1, msg: "請求成功" };
  } catch (err) {
    console.dir(err);
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

// TODO 修改tMemberList資料by社團id,社員id ( 增加社團管理員 去除社團管理員 : 更改會員 fAccessRightId )
const updatatMemberList = async (fMemberManagerId, fCommunityId, ifManager) => {
  try {
    await sql.connect(config);

    let sqlStr;
    //判斷目前身分
    //如果是管理者,改成一般成員代號2
    //不是管理者,改成管理者代號3
    if (ifManager) {
      sqlStr = ` UPDATE Community.tMemberList
            SET fAccessRightId = 2
            WHERE  fCommunityId = ${fCommunityId} and fMemberId = ${fMemberManagerId}                               
          `;
      // console.log("------------------");
    } else {
      sqlStr = ` UPDATE Community.tMemberList
            SET fAccessRightId = 3
            WHERE  fCommunityId = ${fCommunityId} and fMemberId = ${fMemberManagerId}                               
          `;
    }

    const result = await sql.query(sqlStr);
    // console.log(result);

    // if(result.recordset[0]) => 沒東西就會是undefined
    // console.dir(result.recordset[0]);
    if (!result.rowsAffected[0]) {
      return { result: 0, msg: "無法更新" };
    }

    return { result: 1, msg: "請求成功" };
  } catch (err) {
    console.dir(err);
    return { result: 0, msg: "updatatMemberListSQL錯誤", data: err };
  }
};

// const communityModified = async (fId) => {
//     try {
//         await sql.connect(config)

//     }
//     catch (erro) {
//         return { result: 0, msg: "SQL錯誤", data: err }
//     }
// }

//直接測試用 func ， node src/SQL/test.js
// 解除註解，並把匯出方法註解才能用喔
// mySqlFunc();

// *匯出方法 ， 多個方法包在{}裡， ex: {func1, func2}
//{es6寫法communityList:communityList}

module.exports = {
  communityList,
  communityById_communityDetail,
  communityById_communityManager,
  communityById_communityMember,
  communityByString,
  communityCreate,
  communityDelet,
  searchByMemberId,
  communityByFullString,
  communityAddByMemberId,
  updateCommunity,
  deletMemberOfCommunity,
  updatatMemberList,
  searchMemInCom,
  communityAdd,
  ChangeMemberAccessRight,
  SearchMemberAccessRight,
};
