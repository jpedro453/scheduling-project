import { config } from "dotenv";

import mongoose, { ConnectOptions } from "mongoose";

import UserModel from "../models/User";

config();

async function initializeDB() {
    try {
        await mongoose.connect(process.env.DB_URL!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);

        const existingAdmin = await UserModel.findOne({ isAdmin: true });

        if (!existingAdmin) {
            const admin = new UserModel({
                name: "ADMIN",
                email: "jpedroswc453@gmail.com",
                password: "password",
                isAdmin: true,
            });

            await admin.save();
            console.log("Usuário administrador criado com sucesso.");
        }

        console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (err) {
        console.error("Erro ao inicializar o banco de dados:" + err);
    }
}
initializeDB();
