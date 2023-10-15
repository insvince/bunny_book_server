import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, 'book title'],
            unique: true,
        },
        author: {
            type: String,
            require: [true, 'select author'],
            ref: 'Author',
        },
        price: { type: Number, require: true },
        stock: { type: Number, require: true },
        image: { type: String, require: true },
        description: { type: String, min: [20, 'more words'], max: 150 },
        pulishedDate: String,
        categoryID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            require: [true, 'select category'],
        },
    },
    { timestamps: true },
);

let Book = mongoose.model('Book', bookSchema);

export default Book;
