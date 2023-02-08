import { loginUser } from "../use-cases/user";

export default Object.freeze({
  loginUser:  (req: any) => loginUser(req) 
})