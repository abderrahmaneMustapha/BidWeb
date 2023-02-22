import UserRepository from "../../entities/repositories/mongo/userRepository";

interface getUserArgs {
    userRepository: UserRepository;
}

const makeGetUser = ({ userRepository }: getUserArgs) => {
    return async function getUser({ user }: any) {
        return  await userRepository.get(user.username);
    };
};

export default makeGetUser
