const sql = require('mssql');

const config = {
    // user: 'sa',
    // password: 'P@ssw0rd',
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



//登入
const Community_AddLike = async (fPostId, fLikeMemberId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        INSERT INTO Community.tLike(fPostId,fLikeMemberId)
        VALUES(${fPostId},${fLikeMemberId})
        `
        const result = await sql.query(sqlString);
        console.dir(result);

       
        return { result: 1, msg: "新增成功", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};

const Community_RemoveLike = async (PostId, MemberId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        DELETE FROM Community.tLike
        WHERE fPostId=${PostId} AND fLikeMemberId=${MemberId}
        `
        const result = await sql.query(sqlString);
        console.dir(result);

        return { result: 1, msg: "刪除成功", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};

// Community_RemoveLike(3,5);
const getLikes = async (PostId, MemberId) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const sqlString = `
        SELECT *
        FROM Community.tLike
        `
        const result = await sql.query(sqlString);
        console.dir(result);

        return { result: 1, msg: "刪除成功", data: result.recordset };
    } catch (err) {
        console.log(err);
        return { result: 0, msg: "SQL 問題", data: result };
    }
};




module.exports = { Community_AddLike,Community_RemoveLike,getLikes };