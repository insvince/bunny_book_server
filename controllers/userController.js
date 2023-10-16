import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await User.find();

            const allUsersCustom = allUsers.map(user => {
                const { password, ...others } = user._doc;
                return { ...others };
            });

            res.status(200).json(allUsersCustom);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    updateUser: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                password: hashed,
            },
            { new: true }, //mongoose will not return the updated document
        );

        res.status(200).json(user);
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted Successfully!');
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
};

export default userController;
