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

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: [30, 'less than 30'],
            require: true,
            unique: true,
        },
    },
    { timestamps: true },
);

const userSchema = new mongoose.Schema(
    {
        username: { type: String, min: 5, max: 50, require: true },
        fullName: {
            type: String,
            min: 8,
            max: 50,
            require: true,
        },
        password: { type: String, min: 12, max: 40, require: true },
        email: { type: String, require: true, unique: true },
        address: { type: String, min: 20, max: 150 },
        tel: String,
        role: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const orderHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
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
        orderAt: String,
    },
    { timestamps: true },
);

const bookOrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderHistory',
            require: true,
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
);

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
);

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

let Author = mongoose.model('Author', authorSchema);
let Book = mongoose.model('Book', bookSchema);
let User = mongoose.model('User', userSchema);
let Category = mongoose.model('Category', categorySchema);
let OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);
let BookOrder = mongoose.model('BookOrder', bookOrderSchema);
let Cart = mongoose.model('Cart', cartSchema);
let Favourite = mongoose.model('Favourite', favouriteSchema);

export {
    Author,
    Book,
    Category,
    User,
    OrderHistory,
    BookOrder,
    Cart,
    Favourite,
};
