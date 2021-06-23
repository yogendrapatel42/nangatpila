var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let decodedNode = req.session.user;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'secret%other');
    try {

        // && (decodedNode.user_type == 1 || decodedNode.user_type == 5 || decodedNode.user_type == 2)
        if ((decoded.user_type == 1 || decoded.user_type == 5 || decoded.user_type == 2) ) {
            next();
        } else {

            return res.status(401).json({
                message: 'Auth failed Not a Vendor'
            });
        }


    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
