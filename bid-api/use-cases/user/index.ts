import UserRepository from "../../entities/repositories/memory/userRepository";
import makeAuthAdmin from "./auth-admin";
import makeAuthUser from "./auth-user";
import makeGetUser from "./get-user";
import makeLoginUser from "./login-user";
import makeUpdateUser from "./update-user";

const userRepository = new UserRepository();

const authUser = makeAuthUser({ userRepository });
const loginUser = makeLoginUser({ userRepository });
const authAdmin = makeAuthAdmin({ userRepository });
const updateUser = makeUpdateUser({ userRepository });
const getUser = makeGetUser({ userRepository });

export { authUser, loginUser, authAdmin, updateUser, getUser };

export default Object.freeze({
    loginUser,
    authUser,
    authAdmin,
    updateUser,
    getUser
});
