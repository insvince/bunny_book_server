import { Author, User } from '../models/model.js';

const userController = {
    updateUser: async (req, res) => {},

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
};

export default userController;
