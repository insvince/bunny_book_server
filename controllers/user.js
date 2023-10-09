import { User } from '../models/model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let refreshTokens = [];

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    generateAccessToken: user => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.ACCESS_KEY,
            { expiresIn: '1m' },
        );
    },
    generateRefreshToken: user => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.REFRESH_KEY,
            { expiresIn: '365d' },
        );
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                res.status(404).json('Wrong email!');
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if (!validPassword) {
                res.status(404).json('Wrong password!');
            }
            if (user && validPassword) {
                const accessToken = userController.generateAccessToken(user);
                const refreshToken = userController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    path: '/',
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                });

                // remove password response
                const { password, ...others } = user._doc;
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
            refreshTokens = refreshTokens.filter(
                token => token !== req.cookies.refreshToken,
            );
            res.status(200).json('Logout!');
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json('Deleted Successfully!');
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token not valid');
        }
        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter(
                token => token !== refreshToken,
            );
            const newAccessToken = userController.generateAccessToken(user);
            const newRefreshToken = userController.generateRefreshToken(user);
            res.cookie('refreshToken', newRefreshToken, {
                path: '/',
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
            });

            res.status(200).json({ accessToken: newAccessToken });
        });
        // res.status(200).json(refreshToken);
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

export default userController;
