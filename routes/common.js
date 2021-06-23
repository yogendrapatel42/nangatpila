var express = require('express');
var router = express.Router();
var common = require('../models/common');
// const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-login');
const CryptoJS = require('crypto-js');
const key = '&World709rrt';


router.get('/getPatients/:SHC_id', function(req, res) {
    common.getPatients(req.params.SHC_id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows.recordsets[0]);
        }
    });
});

router.get('/getSectors', function(req, res) {
    common.getSectors(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows.recordsets[0]);
        }
    });
});



//#region for ALL USERS
router.post('/login', function(req, res) {
    var UserID = req.body.UserID;
    var Password = CryptoJS.AES.decrypt(req.body.Password, key).toString(CryptoJS.enc.Utf8);
    common.login(UserID, function(err, rows) {
        if (err) {
            res.json(err);
        } else {

            if (!rows.recordsets[0].length) {
                res.json({
                    success: 0,
                    message: `Wrong credential.`
                })
            } else {
                if (Password == rows.recordsets[0][0].Password) {
                    let response = {
                            user_id: rows.recordsets[0][0].user_id,
                            mobile: rows.recordsets[0][0].mobile,
                            name: rows.recordsets[0][0].name,
                            role: rows.recordsets[0][0].role
                        }
                        // const token = jwt.sign(response, 'SECreTIsAlwaYSSecRET');
                    res.json({ token: response, success: 1, role: rows.recordsets[0][0].role });
                } else {
                    res.json({
                        success: 0,
                        message: `Wrong credential`
                    })
                }
            }
        }
    });

});

router.put('/changePassword', function(req, res) {

    var deNEWPassword = CryptoJS.AES.decrypt(req.body.NewPassword, key).toString(CryptoJS.enc.Utf8);
    var dePassword = CryptoJS.AES.decrypt(req.body.Password, key).toString(CryptoJS.enc.Utf8);

    common.getCurrentPassword(req.body.UserID, req.body.UserTypeCode, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            console.log(rows.recordsets[0][0]);
            if (dePassword == rows.recordsets[0][0].Password) {
                common.changePassword(deNEWPassword, req.body.UserID, req.body.UserTypeCode, function(err, rows1) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({ success: true, message: 'Password changed.' });
                    }
                });
            } else {
                res.json({ success: false, message: 'वर्तमान पासवर्ड गलत है !' });
            }
        }
    });
});
//#endregion ALL USERS

router.get('/getDistrict', function(req, res) {
    common.getDistrict(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows.recordsets[0]);
        }
    });
});


module.exports = router;