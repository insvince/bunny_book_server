import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

let refreshTokens = []; //store refeshToken, when delpoy fix upload database

const authController = {
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.ACCESS_KEY,
            { expiresIn: process.env.ACCESS_EXPIRES_IN }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.REFRESH_KEY,
            { expiresIn: process.env.REFRESH_EXPIRES_IN }
        );
    },

    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                ...req.body,
                password: hashed,
            });

            const user = await newUser.save();
            const { password, role, ...others } = user._doc;

            res.status(200).json({ ...others });
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json('Wrong email!');
            }

            const validPassword = bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json('Wrong password!');
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);

                refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    path: '/',
                    httpOnly: true,
                    secure: false, //set true when deploy
                    sameSite: 'strict',
                });

                // elimate password
                const { password, role, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    logoutUser: async (req, res) => {
        try {
            res.clearCookie('refreshToken');
            refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
            res.status(200).json('Logout!');
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token not valid');
        }
        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);

            res.cookie('refreshToken', newRefreshToken, {
                path: '/',
                httpOnly: true,
                secure: true, //set true when deploy
                sameSite: 'strict',
            });

            res.status(200).json({ accessToken: newAccessToken });
        });
    },

    forgotPassword: async (req, res) => {
        try {
            console.log('Forgot Password!');
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
};

export default authController;
