import mongoose from 'mongoose';

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
);

let Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;
