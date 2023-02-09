import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import db from "../../entities/repositories/mongo/utils/mongoConnection";
import makeCreateBid from "./create-bid";
import makeListBid from "./list-bid";
import { EventEmitter } from "node:events"
import UserRepository from "../../entities/repositories/memory/userRepository";
import makeAutoBid from "./auto-bid";

const userRepository = new UserRepository()
const bidRepository = new BidRepository(db);
const itemRepository= new ItemRepository(db);
const eventEmitter = new EventEmitter();

const createBid = makeCreateBid({ bidRepository, itemRepository, eventEmitter });
const listBid = makeListBid({ bidRepository})
const autoBid = makeAutoBid({ userRepository, bidRepository, itemRepository });

export default Object.freeze({
    createBid,
    listBid,
    autoBid,
    eventEmitter
});

export { createBid, listBid, autoBid, eventEmitter };
