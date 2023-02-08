import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import db from "../../entities/repositories/mongo/utils/mongoConnection";
import makeCreateBid from "./create-bid";
import makeListBid from "./list-bid";

const bidRepository = new BidRepository(db);
const itemRepository= new ItemRepository(db);
const createBid = makeCreateBid({ bidRepository, itemRepository});
const listBid = makeListBid({ bidRepository})

export default Object.freeze({
    createBid,
    listBid,
});

export { createBid, listBid };
