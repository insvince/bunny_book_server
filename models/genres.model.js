import mongoose from 'mongoose';

const genresSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 30,
            require: true,
            unique: true,
        },
        descriuption: {
            type: String,
            min: 20,
            max: 150,
            require: true,
        },
    },
    { timestamps: true }
);

let Genres = mongoose.model('Genres', genresSchema);

export default Genres;
