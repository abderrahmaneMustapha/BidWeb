import UserRepository from "../../entities/repositories/memory/userRepository";

interface authUserArgs {
    userRepository: UserRepository;
}

interface authArgs {
    username: string,
    password: string,
}

const makeAuthUser = ({ userRepository }: authUserArgs) => {
    return async function authUser({
        username, password
    }: authArgs) {
        const validate = await userRepository.validate(username, password);
        if (!validate) {
            throw new Error("Authentication error, wrong credentials");
        }

        const user = await userRepository.get(username);
        return user;
    };
};

export default makeAuthUser