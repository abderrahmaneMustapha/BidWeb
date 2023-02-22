import UserRepository from "../../entities/repositories/mongo/userRepository";

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
        const user = await userRepository.get(username);
        if (!(user?.password === password)) {
            throw new Error("Authentication error, wrong credentials");
        }
        return user;
    };
};

export default makeAuthUser