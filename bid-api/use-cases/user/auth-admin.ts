import UserRepository from "../../entities/repositories/mongo/userRepository";
import bcrypt from "bcrypt";

interface authAdminArgs {
    userRepository: UserRepository;
}

interface authArgs {
    username: string;
    password: string;
}

const makeAuthAdmin = ({ userRepository }: authAdminArgs) => {
    return async function authAdmin({ username, password }: authArgs) {
        const user = await userRepository.get(username);

        if (!(user?.password === password)) {
            throw new Error("Authentication error, wrong credentials");
        }

        
        if (!user.is_admin) {
            throw new Error("User not authorized to access this page");
        }
        return user;
    };
};

export default makeAuthAdmin;
