interface IUser {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean; // Nova propriedade para indicar se o usuário é um administrador
}
export default IUser;
