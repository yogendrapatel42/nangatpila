module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            next();
        } else {

            return res.status(401).json({
                message: 'No user logged in'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};