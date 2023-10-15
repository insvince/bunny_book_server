import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                require: true,
            },
        ],
    },
    { timestamps: true },
);

let Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;
