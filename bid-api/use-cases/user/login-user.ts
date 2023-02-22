import UserRepository from "../../entities/repositories/mongo/userRepository";
import bcrypt from "bcrypt";

interface loginUserArgs {
    userRepository: UserRepository;
}

const makeLoginUser = ({ userRepository }: loginUserArgs) => {
    return async function loginUser({ body}: any) {
        const { username, password } = body
        const user = await userRepository.get(username);
        const validate = await bcrypt.compare(password, user.password)
        if (!validate) {
           throw new Error("Authentication error, wrong credentials");
        }
        return user
    };
};

export default makeLoginUser
