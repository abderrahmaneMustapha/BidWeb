import { Bid, Item, User } from "../../entities/models";
import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import { EventEmitter } from "node:events";
import { emailUser } from "../email";
import UserRepository from "../../entities/repositories/memory/userRepository";

interface createBidArgs {
    bidRepository: BidRepository;
    itemRepository: ItemRepository;
    userRepository: UserRepository;
    eventEmitter: EventEmitter,
}

const makeCreateBid = ({ bidRepository, itemRepository, userRepository, eventEmitter }: createBidArgs) => {
    return async function createBid({ body, user, socket }: any) {
        let { amount, item } = body;
        user = user as User;
        let _bid = new Bid(parseInt(amount),user,item,Date.now(),Date.now());
        let _item = await itemRepository.get(item.name);
        await handleBidErrors(bidRepository, item, user, amount, _item);
        const bidCreated: any = await bidRepository.create(_bid);
        if (bidCreated && bidCreated.acknowledged) {
            await updateDb(itemRepository, item, amount, _bid, _item, bidRepository, bidCreated);
            sendEmail(user.email, item.name, Number(amount))
            emailUsers(user.username, item.name, amount, userRepository, bidRepository)
            socket.emit('bid-created-'+_item.name, _bid)
            emitEvent(item.name, user.username, eventEmitter, socket)
        } else {
            throw new Error("Server could not create a bid");
        }
        return bidCreated?.acknowledged
    };
};

export default makeCreateBid;

async function handleBidErrors(
    bidRepository: BidRepository,
    item: any,
    user: User,
    amount: any,
    _item: Item,
) {
    const max = await bidRepository.getMax(item.name);
    if(_item.close_at < Date.now()) {
        throw new Error("Can not bid on this item, biding closed");
    }
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
    _item: Item,
    bidRepository: BidRepository,
    bidCreated: any
) {
    
    _item = { ..._item, highest_bid: parseInt(amount) };
    await itemRepository.update(item.name, _item);
    _bid = { ..._bid, item: _item };
    await bidRepository.update(bidCreated.insertedIn, _bid);
}

function emitEvent(itemName: string, username: string, eventEmitter: EventEmitter, socket: any) {
    eventEmitter.emit('auto-bid', {item: itemName, user: username, socket})
}

function sendEmail(userEmail: string, itemName: string, amount: number) {
    const text = `You have created a bid on ${itemName}, with the amount ${amount}, item still open for bid`
    const subject = "Bid Created Successfully"
    emailUser({userEmail, subject, text})
}

async function emailUsers(user: string, item: string, amount: number, userRepository: UserRepository, bidRepository: BidRepository) {
    let users = await bidRepository.listUsers(item)
    // remove current user
    users = users.filter(u => u!=user)
    // email the rest of the users
    let usersEmails: string[] = []
    for(let i=0; i <users?.length; i++) {
        const userEmail = (await userRepository.get(users[i])).email
        usersEmails.push(userEmail)
    }
    const text = `Another user created a bid on ${item}, with the amount ${amount}$`
    const subject = "User Created New Bid"
    emailUser({userEmail: usersEmails, subject, text})
}