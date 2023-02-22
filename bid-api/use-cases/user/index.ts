import UserRepository from "../../entities/repositories/mongo/userRepository";
import db from "../../entities/repositories/mongo/utils/mongoConnection";
import makeAuthAdmin from "./auth-admin";
import makeAuthUser from "./auth-user";
import makeGetUser from "./get-user";
import makeLoginUser from "./login-user";
import makeNotifyUser from "./notify-user";
import makeRegisterUser from "./register-user";
import makeUpdateUser from "./update-user";

const userRepository = new UserRepository(db);

const authUser = makeAuthUser({ userRepository });
const loginUser = makeLoginUser({ userRepository });
const authAdmin = makeAuthAdmin({ userRepository });
const updateUser = makeUpdateUser({ userRepository });
const getUser = makeGetUser({ userRepository });
const notifyUser = makeNotifyUser({ userRepository });
const registerUser = makeRegisterUser({ userRepository});

export { authUser, loginUser, authAdmin, updateUser, getUser, notifyUser, registerUser };

export default Object.freeze({
    loginUser,
    authUser,
    authAdmin,
    updateUser,
    getUser,
    notifyUser,
    registerUser
});
