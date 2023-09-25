import { Book, Category } from '../models/model.js';

const categoryController = {
    getCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            res.status(200).json(category);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const allCategories = await Category.find();
            res.status(200).json(allCategories);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    addCategory: async (req, res) => {
        try {
            const category = new Category(req.body);
            await category.save();
            res.status(200).json(category);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            await category.updateOne({ $set: req.body });
            res.status(200).json('Update Successfully');
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Book.updateMany(
                { categoryID: req.params.id },
                { $set: { categoryID: null } },
            );
            await Category.findByIdAndRemove(req.params.id);

            res.status(200).json('Deleted Successfully');
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
};

export default categoryController;
