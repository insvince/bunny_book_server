import mongoose from 'mongoose';
import { authorize } from '../database.js'; // Adjust the import path as necessary

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            min: 5,
            max: 50,
            require: true,
            unique: true,
        },
        fullname: {
            type: String,
            min: 8,
            max: 50,
            require: true,
        },
        password: {
            type: String,
            min: 12,
            max: 40,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        address: {
            type: String,
            min: 20,
            max: 150,
        },
        tel: {
            type: String,
            min: 10,
            max: 15,
            require: true,
        },
        role: {
            type: Boolean,
            default: false,
            require: true,
        },
    },
    { timestamps: true },
    { collection: 'users' }
);

let User = authorize.model('User', userSchema);
export default User;
