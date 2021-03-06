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



const PersonalPage = async (id) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        // *丟SQL 指令 並處存結果  ，  SQL指令，先去SQL server是成功在貼在這裡喔
        let sqlStr = `WITH thisM as(
            select m.fId,fName,fAccount,fIntroduction,fCoins,fCity,fAccountType,fPhotoPath,fLastTime from Member.tMember as m
            left JOIN  Member.tAccountType as a ON fAccountTypeId=a.fId
            WHERE m.fid=${id}),thisM2 AS(
            select thisM.*,ml.fCommunityId
            from thisM 
            LEFT JOIN Community.tMemberList as ml
            ON  thisM.fId=ml.fMemberId)
            SELECT thisM2.*,c.fImgPath
            FROM thisM2
            LEFT JOIN Community.tCommunity AS c
            on thisM2.fCommunityId= c.fId

            `
        const result = await sql.query(sqlStr)
        // 看一下回傳結果
        console.dir(result)

        if (!result.rowsAffected[0]) {
            return {
                result: 0,
                msg: "查無結果"
            }
        }
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
/**完成=5 感興趣=0 發起=6 */
/**感興趣活動 */
const PersonalPageOfData = async (fMemberId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // 連接資料庫
        await sql.connect(config)
        let likelist = `WITH JLA as(SELECT TOP(6) JL.fActivityId,A.fActName,A.fActivityDate,fImgPath,A.fMemberId, A.fActAttestId
        FROM Activity.tJoinList AS JL
        LEFT JOIN Activity.tActivity AS A
        ON fActivityId=A.fId
        WHERE fJoinTypeId = 0 AND JL.fMemberId= ${fMemberId}
        order by fJoinTime
	 )  
        SELECT JLA.*, m.fName, t.fAttestName, t.fPayCoin 
        from JLA
        LEFT JOIN Member.tMember as m
        ON JLA.fMemberId = M.fId
		Left JOIN Activity.tAttestType as t
		ON JLA.fActAttestId = t.fId
            `;

        let createlist = `WITH JLA as(SELECT TOP(6) JL.fActivityId,A.fActName,A.fActivityDate,fImgPath,A.fMemberId, A.fActAttestId
        FROM Activity.tJoinList AS JL
        LEFT JOIN Activity.tActivity AS A
        ON fActivityId=A.fId
        WHERE fJoinTypeId=6 AND JL.fMemberId=${fMemberId}
        order by fJoinTime
        )
        SELECT JLA.*,m.fName, t.fAttestName, t.fPayCoin 
        from JLA
        LEFT JOIN Member.tMember as m
        ON JLA.fMemberId=M.fId
        Left JOIN Activity.tAttestType as t
		ON JLA.fActAttestId = t.fId
            `;

        let Expiredattendedlist = `WITH JLA as(SELECT TOP(6) JL.fActivityId,A.fActName,A.fActivityDate,fImgPath,A.fMemberId,  A.fActAttestId
        FROM Activity.tJoinList AS JL
        LEFT JOIN Activity.tActivity AS A
        ON fActivityId=A.fId
        WHERE fJoinTypeId=2 AND fActivityDate<GETDATE() AND JL.fMemberId=${fMemberId}
        order by fJoinTime
        ) 
        SELECT JLA.*,m.fName, t.fAttestName, t.fPayCoin  
        from JLA
        LEFT JOIN Member.tMember as m
        ON JLA.fMemberId=M.fId
        Left JOIN Activity.tAttestType as t
		ON JLA.fActAttestId = t.fId
            `;

        let attendedlist = `WITH JLA as(SELECT TOP(6) JL.fActivityId,A.fActName,A.fActivityDate,fImgPath,A.fMemberId,  A.fActAttestId
        FROM Activity.tJoinList AS JL
        LEFT JOIN Activity.tActivity AS A
        ON fActivityId=A.fId
        WHERE fJoinTypeId=2 AND fActivityDate>GETDATE() AND JL.fMemberId=${fMemberId}
        order by fJoinTime
        ) 
        SELECT JLA.*,m.fName, t.fAttestName, t.fPayCoin 
        from JLA
        LEFT JOIN Member.tMember as m
        ON JLA.fMemberId=M.fId
        Left JOIN Activity.tAttestType as t
		ON JLA.fActAttestId = t.fId
            `

        const likelist_result = await sql.query(likelist)
        const createlist_result = await sql.query(createlist)
        const Expiredattendedlist_result = await sql.query(Expiredattendedlist)
        const attendedlist_result = await sql.query(attendedlist)
        // 看一下回傳結果

        console.log("createlist_result--------------");
        console.dir(createlist_result.rowsAffected);

        console.log("Expiredattendedlist_result--------------");
        console.dir(Expiredattendedlist_result.rowsAffected);

        console.log("likelist_result--------------");
        console.dir(likelist_result.rowsAffected);

        console.log("attendedlist_result--------------");
        console.dir(attendedlist_result.rowsAffected);


        // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
        return {
            result: 1,
            msg: "請求成功",
            data: {
                likes: likelist_result.recordset,
                creates: createlist_result.recordset,
                Expiredattended: Expiredattendedlist_result.recordset,
                attendedlist: attendedlist_result.recordset,
            }
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




//先測試!!!!用 func (terminal>node src/SQL/test.js)
// 解除註解，並把匯出方法註解才能用喔
// PersonalPage(5);


// *匯出方法 ， 多個方法包在{}裡， ex: {func1, func2}
module.exports = {
    PersonalPage,
    PersonalPageOfData
}