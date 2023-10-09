import jwt from 'jsonwebtoken';

const middleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json('Token is not valid');
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json("You're not authenticated");
        }
    },
    verifyTokenAdminAuth: (req, res, next) => {
        middleware.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.role) {
                next();
            } else {
                res.status(403).json("You're not allowed to delete other");
            }
        });
    },
};

export default middleware;
