import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import db from "../../entities/repositories/mongo/utils/mongoConnection";
import makeCreateBid from "./create-bid";

const bidRepository = new BidRepository(db);
const itemRepository= new ItemRepository(db);
const createBid = makeCreateBid({ bidRepository, itemRepository});

export default Object.freeze({
    createBid,
});

export { createBid };
