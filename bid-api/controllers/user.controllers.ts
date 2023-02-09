import { getUser, loginUser, notifyUser, updateUser } from "../use-cases/user";

export default Object.freeze({
  loginUser:  (req: any) => loginUser(req),
  updateUser: (req: any) => updateUser(req),
  getUser: (req: any) => getUser(req),
  notifyUser: (req: any) => notifyUser(req),
})