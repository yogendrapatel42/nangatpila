const dotenv = require('dotenv');
dotenv.config();
var mysql = require('mysql');
var connection = mysql.createPool({
    host: "bff3q3eib9ytvwq5wfvj-mysql.services.clever-cloud.com",
    user: "ue11etubvvxkcyyx",
    password: "4cmR7HAtPL3rwcPrJtY2",
    database: "bff3q3eib9ytvwq5wfvj",
    multipleStatements: true
});
module.exports = connection;