import { Collection, Db } from "mongodb";
import { Bid } from "../../models";
import IBidRepository from "../commun/bidRepository";

class BidRepository implements IBidRepository {
    public readonly _collection: Collection;
    public readonly _collectionName: string = "bid";
    constructor(db: Db) {
        this._collection = db.collection(this._collectionName);
    }
    list(): Promise<Bid[]> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<Bid> {
        throw new Error("Method not implemented.");
    }
    create(entity: Bid): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: Bid): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export default BidRepository;
