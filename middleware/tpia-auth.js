var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let decodedNode = req.session.user;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'officer%code');
    try {
      
        //  && (decodedNode.user_type == 3 || decodedNode.user_type == 23)
            if ((decoded.user_type == 3 || decoded.user_type == 23)) {      
            next();
        }
        else{
            
            return res.status(401).json({
                message: 'Auth failed Not a TPIA'
            }); 
        }


    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
