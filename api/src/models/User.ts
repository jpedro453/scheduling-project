import bcrypt from "bcrypt";
import mongoose, { CallbackError, Document, Model, Schema } from "mongoose";

import IUser from "../interfaces/IUser";

interface IUserSchema extends IUser {
    refreshToken: string;
}
const UserSchema: Schema<IUserSchema> = new Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    refreshToken: String,
});

UserSchema.pre("save", async function (next: any) {
    const user = this;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

const UserModel: Model<IUserSchema> = mongoose.model<IUserSchema>(
    "User",
    UserSchema,
    "users"
);

export default UserModel;
