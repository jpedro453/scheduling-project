import express from "express";
import userController from "../controllers/userControllers";

const app = express();

const authRouter = express.Router();

app.use(express.json());

authRouter.post("/register", userController.register);
authRouter.post("/login", userController.login);

export default authRouter;
