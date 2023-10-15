import User from '../models/user.model.js';

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

    updateUser: async (req, res) => {
        const user = await User.findById(req.params.id);
        await user.updateOne({ $set: req.body });
        res.status(200).json('Updated Successfully!');
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
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
