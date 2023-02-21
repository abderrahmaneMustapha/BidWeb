import { Collection, Condition, Db, ObjectId } from "mongodb";
import { Bid } from "../../models";
import IBidRepository from "../commun/bidRepository";
import handleErrors from "./utils/handleErrors";

class BidRepository implements IBidRepository {
    public _collection: Collection | null = null;
    public readonly _collectionName: string = "bid";
    constructor(db: Promise<Db>) {
        db.then((db) => {
            this._collection = db.collection(this._collectionName);
            this.collectionValidation(db);
        });
    }

    async count(search: string): Promise<number> {
        const result = await this._collection?.countDocuments({
            "item.name": search,
        });
        if (result) return result;
        return 0;
    }

    async list(
        limit: number,
        skip: number,
        search: string,
        filters: any
    ): Promise<Bid[]> {
        let find: any = {
            "item.name": search,
        };
        const result = await this._collection
            ?.find(find, { limit: limit, skip: skip })
            .sort({ amount: -1 })
            .toArray();
        return result as unknown as Bid[];
    }

    async listUsers(item: string): Promise<string[]> {
        // this fucntion return a list of bids for a specific item per user
        // to help us know the list of user who bid on a specific item
        const result = await this._collection?.distinct("user.username", {
            $and: [{ "item.name": item }],
        });
        return result as unknown as string[];
    }

    async userItems(user: string): Promise<string[]> {
        const result = await this._collection?.distinct("item.name", {
            $and: [{ "user.username": user }],
        });

        return result as unknown as string[];
    }

    get(id: string): Promise<Bid> {
        throw new Error("Method not implemented.");
    }

    async getMax(name: string, filter?: any): Promise<Bid> {
        let find = { "item.name": name }
        if( filter) {
            find = {...find,...filter}
        }
        const result = await this._collection
            ?.find(find)
            .sort({ amount: -1 })
            .limit(1)
            .toArray();
        return result?.at(0) as unknown as Bid;
    }

    async create(entity: Bid): Promise<boolean> {
        try {
            const result = await this._collection?.insertOne(entity);
            return result as any;
        } catch (error: unknown) {
            handleErrors(error, "Validation error could not create a new bid");
        }
        return false;
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async update(id: string, entity: Bid): Promise<boolean> {
        const _id: unknown = id;
        try {
            const result = await this._collection?.updateOne(
                { _id: _id as Condition<ObjectId> },
                {
                    $set: {
                        ...entity,
                    },
                }
            );
            return !!result?.modifiedCount;
        } catch (error: unknown) {
            handleErrors(error, "Validation error could not update the item");
        }
        return false;
    }

    private collectionValidation(db: Db) {
        db.command({
            collMod: this._collectionName,
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Bid object validation",
                    required: Bid.getAttributes(),
                    properties: {
                        amount: Bid.getAmountValidation(),
                        user: Bid.getUserValidation(),
                        item: Bid.getItemValidation(),
                        created_at: Bid.getCreatedAtValidation(),
                        updated_at: Bid.getUpdatedAtValidation(),
                    },
                },
            },
        });
    }
}

export default BidRepository;
