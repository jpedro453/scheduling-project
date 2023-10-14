import { Request, Response } from "express";
import UserService from "../services/UserService";
import IUser from "../interfaces/IUser";

class UserController {
    async register(req: Request, res: Response) {
        const { name, email, password }: IUser = req.body;

        if (!name || !email || !password) {
            return res.status(422).json({ msg: "Os campos são obrigatórios" });
        }

        const result = await UserService.registerUser({
            name,
            email,
            password,
        });

        if (result.success) {
            return res.status(200).json({ msg: result.message });
        } else {
            res.status(500).json({ msg: result.message });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password }: IUser = req.body;

        if (!email || !password)
            return res
                .status(422)
                .json({ msg: "Os campos não podem estar vazios" });

        const result = await UserService.loginUser({
            email,
            password,
        });

        if (result.success) {
            res.status(200).json({
                msg: result.message,
                token: result.token,
            });
        } else {
            res.status(500).json({
                msg: result.message,
            });
        }
    }
}

export default new UserController();
