const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    movie_url: {
        type: String
    }
});
const Movie = mongoose.model('MovieList', movieSchema);
module.exports = Movie;