import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// Kết nối đến DB chính
await mongoose
    .connect(`${process.env.MONGODB_DATABASE_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ Connected to Main Database'))
    .catch((err) => {
        console.error('❌ Connected to Main Database Error:', err)
    });
// Kết nối đến DB phụ (auth)
const authorize = mongoose.createConnection(`${process.env.MONGODB_AUTH_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

authorize.on('connected', () => console.log('✅ Connected to Authenticate Database'));
authorize.on('error', (err) => console.error('❌ Authenticate Database Error:', err));

export { mongoose, authorize }; // export mongoose gốc & DB phụ
