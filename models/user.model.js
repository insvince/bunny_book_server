import mongoose from 'mongoose';

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
        role: { type: Boolean, defaul: false },
    },
    { timestamps: true },
);

let User = mongoose.model('User', userSchema);
export default User;
