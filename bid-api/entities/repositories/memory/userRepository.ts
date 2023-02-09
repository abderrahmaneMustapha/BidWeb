import { User } from "../../models";
import IUserRepository from "../commun/userRepository";

class UserRepository implements IUserRepository {
    static data: User[] = [
        {
            username: "user1",
            password: "user2",
            is_admin: false,
            created_at: Date.now(),
            updated_at: Date.now(),
            autoBid: {
                amount: 300,
                amountInitial: 300,
                percentage: 40,
                items: [],
            },
        },
        {
            username: "user2",
            password: "user3",
            is_admin: false,
            created_at: Date.now(),
            updated_at: Date.now(),
            autoBid: {
                amount: 300,
                amountInitial: 300,
                percentage: 40,
                items: [],
            },
        },
        {
            username: "admin1",
            password: "admin2",
            is_admin: true,
            created_at: Date.now(),
            updated_at: Date.now(),
            autoBid: {
                amount: 300,
                amountInitial: 300,
                percentage: 40,
                items: [],
            },
        },
    ];;

    constructor() {
       
    }

    async list(
        limit: number,
        skip: number,
        search: string,
        sort: 1 | -1,
        open: 1 | -1 | 0,
        bidSort: 1 | -1 | 0
    ): Promise<User[]> {
        return UserRepository.data.filter(user => {
            return user.autoBid.items.some(item => item === search)
    });
    }
    async get(id: string): Promise<User> {
        return UserRepository.data.filter((user) => user.username === id)[0];
    }

    create(entity: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async update(id: string, entity: User): Promise<boolean> {
        let user = UserRepository.data.some((d) => d.username === id);
        if (user) {
            UserRepository.data = UserRepository.data.map((d) => {
                if (d.username === id) {
                    return { ...d, ...entity };
                }
                return d;
            });
            return true;
        }

        return false;
    }

    async validate(username: string, password: string): Promise<boolean> {
        return !!UserRepository.data.find(
            (d) => d.username === username && d.password === password
        );
    }

    async removeNotfications(username: string): Promise<string[]> {
        let notifications:string[] = []
        UserRepository.data.map( d => {
            if (d.username === username && d.notifications && d.notifications.length > 0) {
                notifications = d.notifications
                return {...d,  notifications: d.notifications}
            }
            return d
        })
        return notifications
    }
}
export default UserRepository;
