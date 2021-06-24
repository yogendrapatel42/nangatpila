var db = require('../dbconnection');
var dateFormat = require("dateformat");

var common = {
    getSectors: function(callback) {
        return db.query(`SELECT SectorName ,Block,GramPanchayats,Villages,AWCs,SectorSupervisorName,PhoneNumber FROM sectors`, callback);
    },
    getQuestions: function(callback) {
        db.query(`SELECT que_id, question FROM mas_question`, callback);
    },
    register: function(data, callback) {
        return db.query(`INSERT INTO registration (child_name, father_name, mother_name, dob, gender, weight, height, mobile, district_code,subdistrict_code, address,  muac, image, aanganbadi_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.child_name, data.father_name, data.mother_name, dateFormat(data.dob, "yyyy-mm-dd"), data.gender, data.weight, data.height, data.mobile, data.district_code, data.subdistrict_code, data.address, data.muac, data.image, data.aanganbadi_id], callback);
    },
    saveMonthlyVisit: function(data, callback) {
        return db.query(`INSERT INTO monthly_visit (child_id, visit_date, heigth, weigth, muac, remark, image) VALUES (?, ?, ?, ?, ?, ?, ?)`, [data.child_id, dateFormat(data.visit_date, "yyyy-mm-dd"), data.heigth, data.weigth, data.muac, data.remark, data.baseImage], callback);
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