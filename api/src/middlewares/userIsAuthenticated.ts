import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function userIsAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            msg: "Token inválido",
        });
    }
    const token = authToken.split(" ")[1];

    try {
        verify(token, process.env.SECRET!);
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: "Token inválido",
        });
    }
}
