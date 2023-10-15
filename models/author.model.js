import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
        },
        year: {
            type: Number,
            min: [500, 'Above 499'],
            max: [2023, 'got {VALUE} elow current year'],
        },
        books: [
            { type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'Book' },
        ],
        description: {
            type: String,
            require: [true, { min: [20, 'got {VALUE} more words'], max: 150 }],
        },
    },
    { timestamps: true },
);

let Author = mongoose.model('Author', authorSchema);

export default Author;
