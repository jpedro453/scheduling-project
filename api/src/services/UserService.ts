import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import IUser from "../interfaces/IUser";

interface Response {
    success: boolean;
    message?: string;
    token?: string;
}

class UserService {
    async registerUser({
        name,
        email,
        password,
    }: Omit<IUser, "isAdmin">): Promise<Response> {
        const userExists = await UserModel.findOne({ email: email });

        if (userExists) {
            return { success: false, message: "Usuário ja existe" };
        }

        const user = new UserModel({ name, email, password, isAdmin: false });

        try {
            await user.save();
            return { success: true, message: "Usuário registrado com sucesso" };
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: "Algo não está correto, tente novamente mais tarde",
            };
        }
    }

    async loginUser({
        email,
        password,
    }: Omit<IUser, "name" | "isAdmin">): Promise<Response> {
        try {
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                return { success: false, message: "Usuario invalido" };
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword)
                return { success: false, message: "Credenciais incorretas" };

            const token = jwt.sign({ id: user._id }, process.env.SECRET!);
            const refreshToken = jwt.sign(
                { id: user._id },
                process.env.REFRESH_SECRET!
            );

            user.refreshToken = refreshToken;
            await user.save();

            return {
                success: true,
                message: "Usuário logado com sucesso",
                token: token,
            };
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: "Aconteceu um erro, tente novamente mais tarde",
            };
        }
    }
}

export default new UserService();
