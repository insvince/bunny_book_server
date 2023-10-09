import { Author, Book } from '../models/model.js';

const bookController = {
    getBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id)
                .populate('categoryID')
                .populate('author');
            res.status(200).json(book);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    getAllBooks: async (req, res) => {
        try {
            const allBooks = await Book.find();
            res.status(200).json(allBooks);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    addBook: async (req, res) => {
        try {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            if (req.body.author) {
                const author = Author.findById(req.body.author);
                await author.updateOne({ $push: { books: savedBook._id } });
            }
            res.status(200).json(savedBook);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    updateBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            const updatedBook = await book.updateOne({ $set: req.body });
            if (req.body.author) {
                const author = await Author.findById(req.body.author);
                await author.updateOne({ $addToSet: { books: book.id } }); //addToSet: unique array
            }
            res.status(200).json(updatedBook);
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
    deleteBook: async (req, res) => {
        try {
            await Author.updateMany(
                { books: req.params.id },
                {
                    $pull: { books: req.params.id },
                },
            );
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted Successfully');
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },
};

export default bookController;
