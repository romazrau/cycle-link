//使用套件 mssql
const sql = require('mssql');
const { clearScreenDown } = require('readline');

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

//"後端路由"透過Function對資料庫下的指令:CRUD增刪查改
//後端路由的變化影響SQL function參數的接收


//**查詢所有社團
const communityList = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `select * from Community.tCommunity
        where fStatusId != 0;`
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


//**社團名稱(可部分)查詢社團
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
            return { result: 0, msg: "查無結果" }
        }
        return { result: 1, msg: "請求成功", data: result.recordset };

    }
    catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 錯誤", data: err };

    }
};


//**會員Id查詢社團(ex.會員頁面用)
const communityByMemberId = async (fid) => {
    try {
        await sql.connect(config)

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
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        return { result: 1, msg: "請求成功", data: result.recordset }
    }
    catch (err) {
        return { result: 0, msg: "SQL錯誤", data: err };
    }
}


//** 社團Id查詢社團
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



        const result = await sql.query(sqlStr)


        // console.log(result);

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


//**社團id查詢社團管理員
const communityById_communityManager = async (fid) => {
    try {
        // 連接資料庫
        await sql.connect(config)

        //以免停權社團管理員顯示
        let sqlStrPrevent = `select * from Community.tCommunity
        where fId=${fid} and fStatusId != 0`
        const resultPrevent = await sql.query(sqlStrPrevent)
        if (!resultPrevent.recordset[0]) {
            return { result: 0, msg: "無此社團,無法查詢管理員" }
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

//**社團id查詢社員
const communityById_communityMember = async (fid) => {
    try {
        // 連接資料庫
        await sql.connect(config)

        //以免停權社團管理員顯示
        let sqlStrPrevent = `select * from Community.tCommunity
         where fId=${fid} and fStatusId != 0`
        const resultPrevent = await sql.query(sqlStrPrevent)
        if (!resultPrevent.recordset[0]) {
            return { result: 0, msg: "無此社團,無法查詢社員" }
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



//**新增社團
//驗證社團名稱 : 不可為空值 / 不可重複
const communityCreate = async (fName, fStatusId, fImgPath, fInfo, fDate) => {
    try {
        await sql.connect(config)

        //不可為空值: if (!fName) rerutn 
        if (fName) {


            //不可重複:
            //從SQL查詢是否有相同的名稱結果放到變數sqlStrName
            //用sql.query(sqlStrName)回傳一個物件放入restult1
            //抓result1物件的屬性 recordset,如果為空值代表沒有相同的社團名稱被查詢 return 
            let sqlStrName = `select fName from Community.tCommunity 
            where fName = '${fName}'`
            const result1 = await sql.query(sqlStrName);
            if (result1.recordset[0]) {

                return { result: 0, msg: "錯誤:重複社團名稱" }
            }


            let sqlStr = `
            INSERT INTO Community.tCommunity( fName,fStatusId,fImgPath,fInfo,fDate)  
             VALUES ( '${fName}','${fStatusId}','${fImgPath}','${fInfo}','${fDate}');`;


            const result = await sql.query(sqlStr);



            return { result: 1, msg: "請求成功" }
        }
        else {
            return { result: 0, msg: "錯誤:沒有社團名稱" }
        }
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL錯誤", data: err }
    }


};



//**刪除社團:用社員fId設定fStatus停權
//!會員頁面按解散社團
//把fId設定fStatus停權
const communityDelet = async (fId) => {
    try {

        await sql.connect(config);


        //id查詢社團,如果沒有RETURN
        let sqlStr = `select * 
        from Community.tCommunity
        where fId = ${fId}`
        const result = await sql.query(sqlStr);

        // if(result.recordset[0]) => 沒東西就會是undefined
        // console.dir(result.recordset[0]);
        if (!result.recordset[0]) {

            return { result: 0, msg: "無法刪除,沒有此社團" }

        }




        let sqlStrtCommunity = `
        UPDATE Community.tCommunity
        SET fStatusId=0
        WHERE fId = ${fId}      
        `
        const result1 = await sql.query(sqlStrtCommunity);


        return { result: 1, msg: "請求成功" }


    }
    catch (err) {
        console.dir(err);
        return { result: 0, msg: "SQL錯誤", data: err }
    }
};







//TODO 
// //**修改社團
// //!多切一個社團編輯頁面
// const communityModified = async (fId) => {
//     try {
//         await sql.connect(config)

//     }
//     catch (erro) {
//         return { result: 0, msg: "SQL錯誤", data: err }
//     }
// }
//修改:
//修改社團照片
//修改社團名稱
//修改社團狀態
//增加社團管理員
//刪除社團管理員
//修改社團關於我們
//刪除社團成員
//增加社團成員









//直接測試用 func ， node src/SQL/test.js
// 解除註解，並把匯出方法註解才能用喔
// mySqlFunc();


// *匯出方法 ， 多個方法包在{}裡， ex: {func1, func2}
//{es6寫法communityList:communityList}

module.exports = { communityList, communityById_communityDetail, communityById_communityManager, communityById_communityMember, communityByString, communityCreate, communityDelet, communityByMemberId };
