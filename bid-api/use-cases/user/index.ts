import UserRepository from "../../entities/repositories/memory/userRepository";
import makeAuthAdmin from "./auth-admin";
import makeAuthUser from "./auth-user";
import makeLoginUser from "./login-user";

const userRepository = new UserRepository()

const authUser = makeAuthUser({ userRepository })
const loginUser = makeLoginUser({ userRepository })
const authAdmin = makeAuthAdmin({ userRepository })

export { authUser, loginUser, authAdmin}

export default Object.freeze({
  loginUser,
  authUser,
  authAdmin
})