import mongoose from "mongoose";
const { Schema, model } = mongoose;

const movieSchema = new Schema({
    poster: String,
    title: String,
    year: String,
    seen: String,
    comment: String,
    genre: String
})

export default model('Movies', movieSchema);