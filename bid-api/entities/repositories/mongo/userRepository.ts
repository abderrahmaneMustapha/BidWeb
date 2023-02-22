import { Collection, Db } from "mongodb";
import { User } from "../../models";
import IUserRepository from "../commun/userRepository";
import bcrypt from "bcrypt";
import handleErrors from "./utils/handleErrors";

class UserRepository implements IUserRepository {
    public _collection: Collection | null = null;
    public readonly _collectionName: string = "users";
    constructor(db: Promise<Db>) {
        db.then(async (db) => {
            this._collection = db.collection(this._collectionName);
            this.collectionValidation(db);
            await this._collection.createIndex(
                { username: 1 },
                { unique: true }
            );
            await this._collection.createIndex({ email: 1 }, { unique: true });
            await this.addDataIfNotExists();
        });
    }

    static data: User[] = [
        {
            username: "user1",
            password: "user2",
            email: "yacineahmednoob@gmail.com",
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
            email: "abderrahmanemustapha030898@gmail.com",
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
            email: "abdmusttoumi@gmail.com",
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
    ];

    async list(
        limit: number,
        skip: number,
        search: string,
        filters: any
    ): Promise<User[]> {
        const result = await this._collection
            ?.find({ "autoBid.items": [search] })
            .toArray();
        return result as unknown as User[];
    }
    async get(id: string): Promise<User> {
        const result = await this._collection?.findOne({ username: id });
        return result as unknown as User;
    }

    async create(entity: User): Promise<boolean> {
        try {
            const result = await this._collection?.insertOne(entity);
            return result?.acknowledged as boolean;
        } catch (error: unknown) {
            handleErrors(error, "Validation error could not create a new user");
        }
        return false;
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async update(id: string, entity: User): Promise<boolean> {
        try {
            const result = await this._collection?.updateOne(
                { username: id },
                { $set: { ...entity } }
            );
            return !!result?.modifiedCount;
        } catch (error: unknown) {
            handleErrors(error, "Validation error could not update the user");
        }
        return false;
    }

    async validate(username: string, password: string): Promise<boolean> {
        return !!UserRepository.data.find(
            (d) => d.username === username && d.password === password
        );
    }

    async addDataIfNotExists() {
        for (let i = 0; i < UserRepository.data.length; i++) {
            let _data = UserRepository.data[i];
            _data.password = await bcrypt.hash(_data.password, 10);
            try {
                await this._collection?.insertOne(_data);
            } catch (e: any) {
                console.log(e.message);
                break;
            }
        }
    }

    private collectionValidation(db: Db) {
        db.command({
            collMod: this._collectionName,
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Item object validation",
                    required: User.getAttributes(),
                    properties: {
                        username: User.getUsernameValidation(),
                        password: User.getPasswordValidation(),
                        email: User.getEmailValidation(),
                        is_admin: User.getIsAdminValidation(),
                        created_at: User.getCreatedAtValidation(),
                        updated_at: User.getUpdatedAtValidation(),
                        autoBid: User.getAutoBidValidation(),
                        notifications: User.getNotificationsValidation(),
                        bills: User.getBillsValidation(),
                    },
                },
            },
        });
    }
}
export default UserRepository;
