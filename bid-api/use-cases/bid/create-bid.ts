import { Bid, User } from "../../entities/models";
import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import { EventEmitter } from "node:events"
interface createBidArgs {
    bidRepository: BidRepository;
    itemRepository: ItemRepository;
    eventEmitter: EventEmitter,
}

const makeCreateBid = ({ bidRepository, itemRepository, eventEmitter }: createBidArgs) => {
    return async function createBid({ body, user }: any) {
        let { amount, item } = body;

        user = user as User;
        let _bid = new Bid(parseInt(amount),user,item,Date.now(),Date.now());

        await handleBidErrors(bidRepository, item, user, amount);

        const bidCreated: any = await bidRepository.create(_bid);
        
        if (bidCreated && bidCreated.acknowledged) {
            await updateDb(itemRepository,item,amount,_bid,bidRepository,bidCreated);
            emitEvent(item.name, user.username, eventEmitter)
        } else {
            throw new Error("Server could not create a bid");
        }

        return bidCreated?.acknowledged
    };
};

async function handleBidErrors(
    bidRepository: BidRepository,
    item: any,
    user: User,
    amount: any
) {
    const max = await bidRepository.getMax(item.name);
    if (max && max.user.username === user.username) {
        throw new Error("User already have the highest bid");
    }
    if (max && max.amount >= parseInt(amount)) {
        throw new Error("User can not bid, max bid is larger than your bid");
    }
}

async function updateDb(
    itemRepository: ItemRepository,
    item: any,
    amount: any,
    _bid: Bid,
    bidRepository: BidRepository,
    bidCreated: any
) {
    let _item = await itemRepository.get(item.name);
    _item = { ..._item, highest_bid: parseInt(amount) };
    await itemRepository.update(item.name, _item);
    _bid = { ..._bid, item: _item };
    await bidRepository.update(bidCreated.insertedIn, _bid);
}

function emitEvent(itemName: string, username: string, eventEmitter: EventEmitter) {
    eventEmitter.emit('auto-bid', {item: itemName, user: username})
}

export default makeCreateBid;
