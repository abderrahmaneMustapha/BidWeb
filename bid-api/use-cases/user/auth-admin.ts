import UserRepository from "../../entities/repositories/memory/userRepository";

interface authAdminArgs {
    userRepository: UserRepository;
}

interface authArgs {
    username: string;
    password: string;
}

const makeAuthAdmin = ({ userRepository }: authAdminArgs) => {
    return async function authAdmin({ username, password }: authArgs) {
        const validate = await userRepository.validate(username, password);
        if (!validate) {
            throw new Error("Authentication error, wrong credentials");
        }

        const user = await userRepository.get(username);
        if (!user.is_admin) {
            throw new Error("User not authorized to access this page");
        }
        return user;
    };
};

export default makeAuthAdmin;
