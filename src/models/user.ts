import mongoose, { Schema } from "mongoose";
import { string, z } from "zod";

export const userSchemaType = z.object({
    email: string().email(),
    password: string()

});
export type finalUserSchema = z.infer<typeof userSchemaType>;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;