import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true,
        },
        author: {
            type: String,
            require: true,
            ref: 'Author',
        },
        price: { type: Number },
        stock: { type: Number },
        image: { type: String },
        description: { type: String, min: 20, max: 150 },
        pulishedDate: { type: String },
        categoryID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            require: true,
        },
    },
    { timestamps: true },
);

let Book = mongoose.model('Book', bookSchema);

export default Book;
