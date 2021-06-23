var mssql = require("mssql");
const dotenv = require('dotenv');
dotenv.config();
var config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.HOST,
    database: process.env.DATABASE,
    port: 1433,
    driver: "tedious",
    options: {
        encrypt: false,
        trustedConnection: true,
        enableArithAbort: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
    }
}

mssql.connect(config, function(err) {

    if (err)
        throw err;
    else
        console.log('connected to mssql');
});
var con = new mssql.Request();
module.exports = con;



// const sql = require('mssql');
// const dotenv = require('dotenv');
// dotenv.config();

// const sqlConfig = {
//     user: 'sa',
//     password: 'pass',
//     database: 'CitizenCovid',
//     // user: process.env.DB_USER,
//     // password: process.env.DB_PWD,
//     // database: process.env.DB_NAME,
//     server: 'localhost',
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: true, // for azure
//         trustServerCertificate: false // change to true for local dev / self-signed certs
//     }
// }
// var connection = sql.connect(sqlConfig);
// module.exports = connection;
// async() => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect(sqlConfig)
//         const result = await sql.query `select * from T_Volunteer`
//         console.log(result)
//     } catch (err) {
//         // ... error checks
//     }
// }