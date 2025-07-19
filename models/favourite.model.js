import mongoose from 'mongoose';
import { database, authorize } from '../index.js'; // Adjust the import path as necessary

const favouriteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            require: true,
        },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                require: true,
                unique: true,
            },
        ],
    },
    { timestamps: true },
    { collection: 'favourites' }
);

let Favourite = database.model('Favourite', favouriteSchema);

export default Favourite;
