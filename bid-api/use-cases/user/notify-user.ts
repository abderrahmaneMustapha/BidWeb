import UserRepository from "../../entities/repositories/memory/userRepository";

interface getUserArgs {
    userRepository: UserRepository;
}

const makeNotifyUser = ({ userRepository }: getUserArgs) => {
    return async function notifyUser({ user }: any) {
        
        return  await userRepository.removeNotfications(user.username);
    };
};

export default makeNotifyUser
