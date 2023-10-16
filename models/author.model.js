import mongoose from 'mongoose';

const year = new Date().getFullYear();

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
        },
        year: {
            type: Number,
            min: 50,
            max: year,
        },
        books: [
            { type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'Book' },
        ],
        description: {
            type: String,
            require: [true, { min: 20, max: 150 }],
        },
    },
    { timestamps: true },
);

let Author = mongoose.model('Author', authorSchema);

export default Author;
