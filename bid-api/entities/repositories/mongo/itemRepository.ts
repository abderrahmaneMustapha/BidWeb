import { Collection, Db } from "mongodb";
import { Item } from "../../models";
import IItemRepository from "../commun/itemRepository";
import handleErrors from "./utils/handleErrors";

class ItemRepository implements IItemRepository {
    public _collection: Collection | null = null;
    public readonly _collectionName: string = "items";
    constructor(db: Promise<Db>) {
        db.then((db) => {
            this._collection = db.collection(this._collectionName);
            this.collectionValidation(db);
            this._collection.createIndex({ "name": 1}, { unique: true})
        });
    }

    async count (): Promise<number> {
        const result =  await this._collection?.find().count()
        if (result)
            return result
        return 0
    } 
    async list(limit: number, skip: number): Promise<Item[]> {
        console.log(typeof limit)
        console.log(skip)
        const result  = await this._collection?.find({}, { limit: limit, skip: skip}).toArray()
        return result as unknown as Item[]
    }
    get(id: string): Promise<Item> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Item): Promise<boolean> {
        try {
            const result = await this._collection?.insertOne(entity);
            return result?.acknowledged as boolean;
        } catch(error: unknown) {        
            handleErrors(error, 'Validation error could not create a new item')
        }
        return false  
    }
    async delete(id: string): Promise<boolean> {
        try {
            const result = await this._collection?.deleteOne({ name: id})
            return result?.deletedCount === 1
        } catch (error: unknown) {
            handleErrors(error, 'Error Item was not deleted')
        }
        return false
    }
    update(entity: Item): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private collectionValidation(db: Db) {
        db.command({
            collMod: this._collectionName,
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Bid object validation",
                    required: Item.getAttributes(),
                    properties: {
                        name: Item.getNameValidation(),
                        description: Item.getDescriptionValidation(),
                        image: Item.getImageValidation(),
                        close_at: Item.getCloseAtValidation(),
                        created_by: Item.getCreatedByValidation(),
                        created_at: Item.getCreatedAtValidation(),
                        updated_at: Item.getUpdatedAtValidation(),
                    },
                },
            },
        });
    }
}

export default ItemRepository;
