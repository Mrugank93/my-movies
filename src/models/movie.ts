import mongoose, { Schema } from "mongoose";
import { string, z } from "zod";

export const movieSchemaZod = z.object({
    title: string(),
    image: string(),
    year: string()

});

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

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;