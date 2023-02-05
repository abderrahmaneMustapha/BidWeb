import { User } from "../../models";
import IUserRepository from "../commun/userRepository";

class UserRepository implements IUserRepository {
  private data: User[];

  constructor() {
    this.data = [
      {
        id: "1",
        username: "user1",
        password: "user2",
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "2",
        username: "user2",
        password: "user3",
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "3",
        username: "admin1",
        password: "admin2",
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
  }

  list(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async get(id: string): Promise<User> {
    return this.data.filter(user => user.id === id)[0];
  }
  create(entity: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(entity: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(entity: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}

export default UserRepository