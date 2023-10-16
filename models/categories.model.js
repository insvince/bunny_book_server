import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 30,
            require: true,
            unique: true,
        },
    },
    { timestamps: true },
);

let Category = mongoose.model('Category', categorySchema);

export default Category;
