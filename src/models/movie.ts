import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.models.movieSchema || mongoose.model("User", movieSchema);

export default Movie;