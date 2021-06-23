var db = require('../dbconnection');
var dateFormat = require("dateformat");
var common = {
    getSectors: function(callback) {
        db.query(`SELECT SectorName ,Block,GramPanchayats,Villages,AWCs,SectorSupervisorName,PhoneNumber FROM sectors`, callback);
    },

    register: function(data, callback) {
        db.query(`INSERT INTO registration (child_name, father_name, mother_name, dob, gender, weight, height, mobile, district_code,subdistrict_code, address,  muac, image, aanganbadi_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.child_name, data.father_name, data.mother_name, dateFormat(data.dob, "yyyy-mm-dd"), data.gender, data.weight, data.height, data.mobile, data.district_code, data.subdistrict_code, data.address, data.muac, data.image, data.aanganbadi_id], callback);
    },



    //#region All USER
    login: function(mobile, callback) {
        db.query(`SELECT user_id,mobile, name, password, role, active FROM users where mobile=? and active=1`, [mobile], callback);
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