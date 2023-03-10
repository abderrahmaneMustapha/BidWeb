import { EventEmitter } from "node:events";
import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import db from "../../entities/repositories/mongo/utils/mongoConnection";
import makeCreateBid from "./create-bid";
import makeListBid from "./list-bid";
import UserRepository from "../../entities/repositories/mongo/userRepository";
import makeAutoBid from "./auto-bid";
import makeWonBid from "./won-bid";
import makeHighestBid from "./highest-bid";
import makeUserItems from "./user-items";

const userRepository = new UserRepository(db);
const bidRepository = new BidRepository(db);
const itemRepository = new ItemRepository(db);
const eventEmitter = new EventEmitter();

const createBid = makeCreateBid({
    bidRepository,
    itemRepository,
    userRepository,
    eventEmitter,
});
const listBid = makeListBid({ bidRepository });
const autoBid = makeAutoBid({ userRepository, bidRepository, itemRepository });
const wonBid = makeWonBid({ bidRepository, itemRepository, userRepository});
const highestBid = makeHighestBid({bidRepository})
const userItems = makeUserItems({bidRepository, itemRepository})

export default Object.freeze({
    createBid,
    listBid,
    autoBid,
    wonBid,
    highestBid,
    userItems,
    eventEmitter,
});

export { createBid, listBid, autoBid, wonBid, eventEmitter, highestBid, userItems };
