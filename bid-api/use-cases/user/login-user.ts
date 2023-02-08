import UserRepository from "../../entities/repositories/memory/userRepository";

interface loginUserArgs {
    userRepository: UserRepository;
}

const makeLoginUser = ({ userRepository }: loginUserArgs) => {
    return async function loginUser({ body}: any) {
        const { username, password } = body
        const validate = await userRepository.validate(username, password);

        if (!validate) {
           throw new Error("Authentication error, wrong credentials");
        }

        const user = await userRepository.get(username);
        return user
    };
};

export default makeLoginUser
