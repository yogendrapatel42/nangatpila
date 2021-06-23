var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let decodedNode = req.session.user;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'admin%champs');

    try {
        if ((decoded.user_type == 4 || decoded.user_type == 8)) {
            //  && (decodedNode.user_type == 4 || decodedNode.user_type == 8)
            next();
        }
        else {

            return res.status(401).json({
                message: 'Auth failed Not HO'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
