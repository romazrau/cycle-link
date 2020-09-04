//使用套件 mssql
const sql = require('mssql');

// *資料庫連結設定檔 大家都把 sa 的密碼改成 everybodycanuse 才能一直用喔
const config = {
    user: 'sa',
    password: 'everybodycanuse',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'SeaTurtleOnTheWay',
}

//"後端路由"透過Function對資料庫下的指令:CRUD增刪查改
//後端路由的變化影響SQL function參數的接收


//**查詢所有社團
const communityList = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `select * from Community.tCommunity`
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        console.dir(result)

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


//**使用者文字條件查詢社團
const communityByString = async (fName) => {
    try {
        // 連接資料庫
        await sql.connect(config)

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
        WHERE  C.fName like  '%${fName}%'
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
            return { result: 0, msg: "查無結果" }
        }
        return { result: 1, msg: "請求成功", data: result.recordset };

    }
    catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 錯誤", data: err };

    }
};






//** 使用者CLICK(id)查詢特定社團
//(傳給特定路由去使用)
const communityById_communityDetail = async (fid) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
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
        WHERE  C.fId = ${fid}
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



        const result = await sql.query(sqlStr)


        console.log(result);

        //如果沒撈到資料的錯誤處理
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
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



const communityById_communityManager = async (fid) => {
    try {
        // 連接資料庫
        await sql.connect(config)
        let sqlStr = `with 
        v_Community
        as(
        select MemberList.fMemberId
              ,MemberList.fAccessRightId
        from Community.tMemberList as MemberList
        where fCommunityId =  ${fid} and fAccessRightId = 3
        ),
        v_getCommunitytAccessRight
        as(
        select v_Community.fMemberId,
               CommunitytAccessRight.fName 
        from  v_Community as v_Community
        LEFT JOIN  Community.tAccessRight as CommunitytAccessRight
        on v_Community.fAccessRightId = CommunitytAccessRight.fId 
        )
        
        select  MembertMember.fName,
                MembertMember.fPhotoPath	       
        from v_getCommunitytAccessRight as v_getCommunitytAccessRight
        LEFT JOIN Member.tMember as MembertMember
        on v_getCommunitytAccessRight.fMemberId = MembertMember.fId
        `;


        const result = await sql.query(sqlStr)
        //如果沒撈到資料的錯誤處理
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return { result: 1, msg: "請求成功", data: result.recordset };
    } catch (err) {
        return { result: 0, msg: "SQL 錯誤", data: err };
    }
};


const communityById_communityMember = async (fid) => {
    try {
        // 連接資料庫
        await sql.connect(config)

        let sqlStr = `
        select CommunitytMemberList.fId,
      CommunitytMemberList.fJoinDate,
      MembertMember.fName,
      MembertMember.fPhotoPath
      from Community.tMemberList as  CommunitytMemberList
      LEFT JOIN Member.tMember as MembertMember
       on MembertMember.fId = CommunitytMemberList.fMemberId
       where CommunitytMemberList.fCommunityId = ${fid}
        `;

        const result = await sql.query(sqlStr)
        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        //如果沒撈到資料的錯誤處理
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        return { result: 1, msg: "請求成功", data: result.recordset };

    } catch (err) {
        return { result: 0, msg: "SQL錯誤", data: err }

    }

};

//TODO 新增社團
const communityCreate = async (fName, fStatusId, fImgPath, fInfo, fDate) => {
    try {
        await sql.connect(config)
        let sqlStr = `
        INSERT INTO Community.tCommunity( fName,fStatusId,fImgPath,fInfo,fDate)  
             VALUES ( '${fName}','${fStatusId}','${fImgPath}','${fInfo}','${fDate}');`;


        const result = await sql.query(sqlStr);



        return { result: 1, msg: "請求成功" }
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL錯誤", data: err }
    }


};


//TODO 修改特定社團

//TODO 刪除特定社團







//直接測試用 func ， node src/SQL/test.js
// 解除註解，並把匯出方法註解才能用喔
// mySqlFunc();


// *匯出方法 ， 多個方法包在{}裡， ex: {func1, func2}
//{es6寫法communityList:communityList}
module.exports = { communityList, communityById_communityDetail, communityById_communityManager, communityById_communityMember, communityByString, communityCreate };
