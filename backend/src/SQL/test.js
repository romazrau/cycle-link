const sql = require('mssql');

const config = {
    // user: 'sa',
    // password: 'P@ssw0rd',
    user: 'sa',
    password: 'everybodycanuse',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'SeaTurtleOnTheWay',
}
 
const h = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result = await sql.query(`select * from Member.tAccountType`)
        console.dir(result)
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
};

module.exports = h;