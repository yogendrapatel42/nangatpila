var express = require('express');
var router = express.Router();
var common = require('../models/common');
const checkAuth = require('../middleware/check-login');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');
router.get('/', function(req, res) {
    res.json({ msg: "Welcome to Nangat Pila" });
});
router.get('/getPatients/:SHC_id', function(req, res) {
    common.getPatients(req.params.SHC_id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
            // res.json(rows.recordsets[0]);
        }
    });
});

router.get('/getSectors', function(req, res) {
    common.getSectors(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
            // res.json(rows.recordsets[0]);
        }
    });
});
router.get('/getQuestions', function(req, res) {
    common.getQuestions(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
            // res.json(rows.recordsets[0]);
        }
    });
});

router.post('/register', function(req, res) {
    common.register(req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
            // res.json(rows.recordsets[0]);
        }
    });
});


router.post('/saveMonthlyVisit', async function(req, res) {
    // let base64Image = baseImage.split(';base64,').pop();

    let filename = Date.now() + '.jpg';
    let path = './uploads/' + filename;
    fs.writeFile(path, req.body.baseImage, { encoding: 'base64' }, function(err) {
        req.body.baseImage = filename;
        common.saveMonthlyVisit(req.body, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
                // res.json(rows.recordsets[0]);
            }
        });
    });

});


//#region for ALL USERS
router.post('/login', function(req, res) {
    var mobile = req.body.mobile;
    common.login(mobile, function(err, rows) {
        if (err) {
            res.json(err);
        } else {

            if (!rows.length) {
                res.json({
                    success: 0,
                    message: `Wrong credential.`
                })
            } else {
                if (req.body.password == rows[0].password) {
                    let response = {
                            user_id: rows[0].user_id,
                            mobile: rows[0].mobile,
                            name: rows[0].name,
                            role: rows[0].role
                        }
                        // const token = jwt.sign(response, 'SECreTIsAlwaYSSecRET');
                    res.json({ token: response, success: 1 });
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