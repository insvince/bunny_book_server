import jwt from 'jsonwebtoken';

const middleware = {
    getToken: (req, res) => {
        try {
            const token = req.headers.token;
            const accessToken = token.split(' ')[1];
            return accessToken;
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },

    verifyToken: (req, res, next) => {
        try {
            const token = req.headers.token;
            if (token) {
                const accessToken = token.split(' ')[1];
                jwt.verify(accessToken, process.env.ACCESS_KEY, (err, user) => {
                    if (err) {
                        return res.status(403).json('Token is not valid');
                    }
                    req.user = user;
                    next();
                });
            } else {
                res.status(401).json("You're not authenticated");
            }
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },
    verifyTokenAdminAuth: (req, res, next) => {
        try {
            middleware.verifyToken(req, res, () => {
                if (req.user.id == req.params.id || req.user.role) {
                    next();
                } else {
                    return res.status(403).json("You're not allowed to delete other");
                }
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },
    verifyTokenIsAdmin: (req, res, next) => {
        try {
            middleware.verifyToken(req, res, () => {
                if (req.user.role) {
                    next();
                } else {
                    return res.status(403).json("You don't have access!");
                }
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },
};

export default middleware;
