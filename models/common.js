var db = require('../dbconnection');
var common = {
    getSectors: function(callback) {
        db.query(`SELECT SectorName ,Block,GramPanchayats,Villages,AWCs,SectorSupervisorName,PhoneNumber FROM sectors`, callback);
    },


    //#region All USER
    login: function(UserID, callback) {
        db.query(`SELECT * FROM T_lgn where UserID = '${UserID}' and UserTypeCode = 10`, callback);
    },

    getCurrentPassword: function(UserID, UserTypeCode, callback) {

        return db.query(`select Password from T_lgn WHERE UserID = ${UserID} AND UserTypeCode = ${UserTypeCode}`, callback);

    },
    changePassword: function(Password, UserID, UserTypeCode, callback) {

        return db.query(
            `update T_lgn set Password = ${Password} where UserID = ${UserID} AND UserTypeCode = ${UserTypeCode}`,
            callback);
    },
    //#endregion USER
};
module.exports = common;