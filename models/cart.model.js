import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        books: [
            {
                bookId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Book',
                    require: true,
                },
                quantity: Number,
            },
        ],
    },
    { timestamps: true },
    { collection: 'carts' }
);

let Cart = mongoose.model('Cart', cartSchema);

export default Cart;
