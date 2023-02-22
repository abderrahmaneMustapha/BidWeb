import UserRepository from "../../entities/repositories/mongo/userRepository";
import bcrypt from "bcrypt";
import { User } from "../../entities/models";
import { autoBid } from "../bid";

interface makeRegisterUserArgs {
    userRepository: UserRepository;
}

const makeRegisterUser = ({ userRepository }: makeRegisterUserArgs) => {
    return async function registerUser({ body }: any) {
        const { username, password, email } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const autoBid = {
            amount: 0,
            amountInitial: 0,
            percentage: 0,
            items: [],
        };
        const user = new User(
            username,
            hashedPassword,
            email,
            false,
            Date.now(),
            Date.now(),
            autoBid,
            [], []
        );

        const res = await userRepository.create(user);

        if (!res) {
            throw new Error("Authentication error, make sure that your username and email are unique");
        }
        return user;
    };
};

export default makeRegisterUser;
