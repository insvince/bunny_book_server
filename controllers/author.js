import Author from '../models/author.model.js';
import Book from '../models/book.model.js';

const authorController = {
    getAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate(
                'books',
                'title',
            );
            res.status(200).json(author);
        } catch (err) {
            res.status(404).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    getAllAuthors: async (req, res) => {
        try {
            const allAuthors = await Author.find();
            res.status(200).json(allAuthors);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    addAuthor: async (req, res) => {
        try {
            const newAuthor = new Author(req.body);
            const savedAuthor = await newAuthor.save();
            res.status(200).json(savedAuthor);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    /* UpdateOne mean update a records with id or params @@  */
    updateAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            await author.updateOne({
                $set: req.body, // $set => update
            });

            res.status(200).json('Updated Successfully');
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            await Book.updateMany({ author: req.params.id }, { author: null });
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted Successfully');
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

export default authorController;
