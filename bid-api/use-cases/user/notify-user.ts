import UserRepository from "../../entities/repositories/mongo/userRepository";

interface getUserArgs {
    userRepository: UserRepository;
}

const makeNotifyUser = ({ userRepository }: getUserArgs) => {
    return async function notifyUser({ user }: any) {
        const res =  await userRepository.get(user.username)
        return res?.notifications ;
    };
};

export default makeNotifyUser
