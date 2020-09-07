const sql = require('mssql');

const config = {
    // user: 'sa',
    // password: 'P@ssw0rd',
    user: 'sa',
    password: 'everybodycanuse',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'SeaTurtleOnTheWay',
}


//確認訪客在不在
const test = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select M.fId, M.fName , T.fAccountType as 'account type' , T.fAccountAuthority as 'account authority'
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId
        where fAccount = 'guest' AND fPassword = 'badiii7777';`
        const result = await sql.query(sqlString);
        console.dir(result)
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
};

//登入
const login = async (account) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select M.fId, M.fName , M.fPassword, T.fAccountType as 'fAccountType' , T.fAccountAuthority as 'fAccountAuthority'
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId
        where fAccount = '${account}';`
        const result = await sql.query(sqlString);
        // console.dir(result);

        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "帳號或密碼錯誤" }
        }
        return { result: 1, msg: "登入成功", data: result.recordset[0] };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};


// 搜尋 member
const memberList = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select M.fId,M.fAccount, M.fName , M.fCity, M.fCoins , T.fAccountType as 'fAccountType' , T.fAccountAuthority as 'fAccountAuthority' , M.fIntroduction, M.fPhotoPath, M.fLastTime
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId;`;
        const result = await sql.query(sqlString);
        // console.dir(result);

        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        return { result: 1, msg: "查詢成功", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};


// 搜尋 member
const memberById = async (id) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select M.fId ,M.fAccount, M.fName, M.fCity, M.fCoins , T.fAccountType as 'fAccountType' , T.fAccountAuthority as 'fAccountAuthority' , M.fIntroduction, M.fPhotoPath, M.fLastTime
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId
        where M.fId = '${id}';`
        const result = await sql.query(sqlString);
        // console.dir(result);

        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        return { result: 1, msg: "查詢成功", data: result.recordset};
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題" };
    }
};


// 搜尋 member
const memberByNameOrAccount = async (str) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        select M.fId ,M.fAccount, M.fName, M.fCity, M.fCoins , T.fAccountType as 'fAccountType' , T.fAccountAuthority as 'fAccountAuthority', M.fPhotoPath, M.fLastTime
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId
        where M.fAccount like '%${str}%' or M.fName like '%${str}%';`
        const result = await sql.query(sqlString);
        // console.dir(result);

        if (!result.rowsAffected[0]) {
            return { result: 0, msg: "查無結果" }
        }
        return { result: 1, msg: "查詢成功", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題" };
    }
};





const changeDetail = async (id, memberObj) => {
    try {  
        delete memberObj.fId;                     //屬性中 fid 刪除，避免接下來的迴圈寫入ID

        let objKeyArr = Object.keys(memberObj);  // [fBirthdate,  fAddress]
        let setArr = objKeyArr.map((item) => 
            `${item} = '${memberObj[item]}'`    // ex: fBirthdate = '2000/02/20'                                             
        )                                       // [fBirthdate = '2000/02/20', fAddress = '復興南路一段390號2樓']
        let setStr = setArr.join(', ');         // "fBirthdate = '2000/02/20', fAddress = '復興南路一段390號2樓'"
        console.log("Set 連接字串: " + setStr);

        await sql.connect(config);
        const sqlString = `
        --updata
        UPDATE Member.tMember 
        SET ${setStr}
        WHERE fId = ${id}  ;       
        `;
        const result = await sql.query(sqlString);
        // console.dir(result);

        return {result:1, msg:"更改成功"};
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: err };
    }
};
// changeDetail(10, {
//     fBirthdate: '2000/02/20',
//     fMail:'cycle2link@gmail.com',
//     fAddress: '復興南路一段390號2樓',
// })




module.exports = {test, login, changeDetail, memberById ,memberList, memberByNameOrAccount};