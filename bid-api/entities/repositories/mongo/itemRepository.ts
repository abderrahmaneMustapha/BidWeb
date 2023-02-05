import { Collection, Db } from "mongodb";
import { Item } from "../../models";
import IItemRepository from "../commun/itemRepository";

class ItemRepository implements IItemRepository {
    public _collection: Collection | null = null;
    public readonly _collectionName: string = "items";
    constructor(db: Promise<Db>) {
        db.then((db) => {
            this._collection = db.collection(this._collectionName);
            this.collectionValidation(db);
        });
    }

    list(): Promise<Item[]> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<Item> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Item): Promise<boolean> {
        const result = await this._collection?.insertOne(entity);
        return result?.acknowledged as boolean;
    }
    delete(entity: Item): Promise<boolean> {
        throw new Error("Method not implemented.");
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
