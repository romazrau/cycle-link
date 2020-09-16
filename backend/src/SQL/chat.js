const sql = require('mssql');

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



const myChatroomList = async (id) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select C.* , M.fName as 'fMember1Name', M2.fName as 'fMember2Name',  d.fIsReaded, IIF( d.fMemberId = 3 , 1, 0 ) as fIsMeLastChat
        from Chat.tChatroom as C
        left join Member.tMember as M
        on C.fMemberId1 = M.fId
        left join Member.tMember as M2
        on C.fMemberId2 = M2.fId
        left join  Chat.tChatData as d
        on C.fLastDataId = d.fId
        where fMemberId1 = ${id} OR fMemberId2 = ${id}
        order by fLastDataId desc;
        `;
        const result = await sql.query(sqlString);
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "趕快去找人聊天吧~" }
        }
        return { result: 1, msg: "你的聊天室來囉", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: err };
    }
};


const getChatroomByIdId2 = async (id, id2) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select C.* , M.fName as 'fMember1Name', M2.fName as 'fMember2Name'
        from Chat.tChatroom as C
        left join Member.tMember as M
        on C.fMemberId1 = M.fId
        left join Member.tMember as M2
        on C.fMemberId2 = M2.fId
        where ( fMemberId1 = ${id} and fMemberId2 = ${id2} ) or ( fMemberId1 = ${id2} and fMemberId2 = ${id} );
        `;
        const result = await sql.query(sqlString);
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        return { result: 1, msg: "有結果", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};


// 新增聊天室
const insertChatroom = async (id, id2) => {
    try {
        if(id == id2){
            return {result: 0, msg: "不要跟自己聊天嘛"}
        }

        await sql.connect(config);

        let check = await getChatroomByIdId2(id, id2);

        if(check.result){
            return {result: 0, msg: "已有聊天室"};
        }

        const sqlString = `
        INSERT INTO Chat.tChatroom
	    ( fMemberId1, fMemberId2 )
        VALUES ( ${id}, ${id2});
        `;
        const result = await sql.query(sqlString);
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "新增失敗" }
        }
        return { result: 1, msg: "新增成功" };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};


const upChatroomLastData = async (id) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        with roomData as (
        select max(fId) as fLastId
        from Chat.tChatData
        where fChatRoomId = ${id}
        )
        UPDATE Chat.tChatroom 
        SET fLastDataId = roomData.fLastId
        from roomData
        WHERE fId = ${id} ;
        `;
        const result = await sql.query(sqlString);
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "修改失敗" }
        }
        return { result: 1, msg: "修改成功" };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
}



// 已讀聊天室
const readChatroomMessages = async (chatroom, yourId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        with roomData as (
        select max(fId) as fLastId
        from Chat.tChatData
        where fChatRoomId = ${chatroom}
        )
        UPDATE Chat.tChatData
        SET fIsReaded = 1
        from roomData
        WHERE fId = roomData.fLastId and fMemberId != ${yourId}
        `;
        const result = await sql.query(sqlString);
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "更改失敗" }
        }

        return { result: 1, msg: "更改成功" };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};



// 取得聊天內容
const myChatroomMessages = async (chatroom, yourId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select d.* , m.fName
        from Chat.tChatData as d
        left join Member.tMember as m
        on m.fId = d.fMemberId
        where fChatRoomId = ${chatroom};
        `;
        const result = await sql.query(sqlString);
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "跟對方打個招呼吧" }
        }

        const uplastData = await readChatroomMessages(chatroom, yourId);
        console.log("+++++++++++++++++");
        console.log(uplastData);

        return { result: 1, msg: "你的聊天室來囉", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};


// 新增聊天內容
const insertMessage = async (obj) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        INSERT INTO Chat.tChatData
	    ( fChatRoomId, fTime, fMemberId, fContent )
        VALUES (${obj.chatroomId}, '${obj.time}', ${obj.userId}, '${obj.message}');
        `;
        const result = await sql.query(sqlString);
        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "新增失敗" }
        }

        const updataLastData =  await upChatroomLastData(obj.chatroomId);
        // console.log(updataLastData);
        if(!updataLastData.result){
            return { result: 1, msg: "新增成功，但更新最新資料位置失敗" };
        }

        return { result: 1, msg: "新增成功" };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};






module.exports = { myChatroomList, myChatroomMessages, insertMessage, insertChatroom };
