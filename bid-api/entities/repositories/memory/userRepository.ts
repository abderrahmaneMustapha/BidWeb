import { User } from "../../models";
import IUserRepository from "../commun/userRepository";

class UserRepository implements IUserRepository {
  private data: User[];

  constructor() {
    this.data = [
      {
        username: "user1",
        password: "user2",
        is_admin: false,
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        username: "user2",
        password: "user3",
        is_admin: false,
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        username: "admin1",
        password: "admin2",
        is_admin: true,
        created_at: Date.now(),
        updated_at: Date.now(),
      },
    ]
  }

  list(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async get(id: string): Promise<User> {
    return this.data.filter(user => user.username === id)[0];
  }
  create(entity: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, entity: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}

export default UserRepository