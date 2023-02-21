import { Collection, Db, Sort } from "mongodb";
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
            this._collection.createIndex({ name: 1 }, { unique: true });
        });
    }

    async count(search: string, open: 1 | -1 | 0): Promise<number> {
        let openFilter = this.openBidItemFilter(open);
        const result = await this._collection?.countDocuments({
            $or: [
                { description: { $regex: search } },
                { name: { $regex: search } },
            ],
            ...openFilter,
        });
        if (result) return result;
        return 0;
    }

    async list(
        limit: number,
        skip: number,
        search: string,
        filters: any
    ): Promise<Item[]> {
        const { sort, open, bidSort, maxTime, minTime} = filters;
        let openFilter: any = this.openBidItemFilter(open);
        let sortFilter = this.sortBidItemFilter(sort, bidSort);
        if (maxTime && minTime)
            openFilter = {close_at: { $gte: minTime, $lte: maxTime }};
        const result = await this._collection
            ?.find(
                {
                    $or: [
                        { description: { $regex: search } }, { name: { $regex: search } }
                    ],
                    ...openFilter,
                }, { limit: limit, skip: skip }
            )
            .sort(sortFilter)
            .toArray();
        return result as unknown as Item[];
    }

    async items(): Promise<string[]> {
        const result = await this._collection?.distinct("name");

        return result as unknown as string[];
    }
    
    async get(id: string): Promise<Item> {
        const result = await this._collection?.findOne({ name: id });
        return result as unknown as Item;
    }

    async create(entity: Item): Promise<boolean> {
        try {
            const result = await this._collection?.insertOne(entity);
            return result?.acknowledged as boolean;
        } catch (error: unknown) {
            handleErrors(error, "Validation error could not create a new item");
        }
        return false;
    }

    async delete(id: string): Promise<boolean> {
        try {
            const result = await this._collection?.deleteOne({ name: id });
            return result?.deletedCount === 1;
        } catch (error: unknown) {
            handleErrors(error, "Error Item was not deleted");
        }
        return false;
    }

    async update(id: string, entity: Item): Promise<boolean> {
        let updateEntity: any = {
            image: entity.image,
            description: entity.description,
            close_at: entity.close_at,
            updated_at: entity.updated_at,
        };
        if (entity.highest_bid > 0) {
            updateEntity = { ...updateEntity, highest_bid: entity.highest_bid };
        }
        try {
            const result = await this._collection?.updateOne(
                { name: id }, {$set: {...updateEntity,}}
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
                    title: "Item object validation",
                    required: Item.getAttributes(),
                    properties: {
                        name: Item.getNameValidation(),
                        description: Item.getDescriptionValidation(),
                        image: Item.getImageValidation(),
                        close_at: Item.getCloseAtValidation(),
                        created_by: Item.getCreatedByValidation(),
                        created_at: Item.getCreatedAtValidation(),
                        updated_at: Item.getUpdatedAtValidation(),
                        highest_bid: Item.getHighestBidValidation(),
                    },
                },
            },
        });
    }

    private openBidItemFilter(open: 1 | -1 | 0) {
        let openFilter = undefined;
        if (open == 1) {
            openFilter = {
                close_at: {
                    $gt: new Date().getTime(),
                },
            };
        } else if (open == -1) {
            openFilter = {
                close_at: {
                    $lte: new Date().getTime(),
                },
            };
        }

        return openFilter;
    }

    private sortBidItemFilter(sort: 1 | -1, bidSort: 1 | -1 | 0): Sort {
        if (!bidSort) {
            return { created_by: sort };
        }
        return { highest_bid: bidSort as 1 | -1, created_by: sort };
    }
}

export default ItemRepository;
