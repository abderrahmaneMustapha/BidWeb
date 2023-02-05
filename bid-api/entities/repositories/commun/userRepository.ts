import { User } from "../../models";
import IBaseRepository from "./baseRepository";

interface IUserRepository extends IBaseRepository<User> {
  
}

export default IUserRepository