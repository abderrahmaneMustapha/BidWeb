import { Bid, Item, User } from "../../entities/models";
import UserRepository from "../../entities/repositories/mongo/userRepository";
import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import { emailUser } from "../email";

interface autoBidArgs {
    userRepository: UserRepository;
    bidRepository: BidRepository;
    itemRepository: ItemRepository;
}

interface innerAutoBidArgs {
    user: string;
    item: string;
    socket:any;
}

const makeAutoBid = ({
    userRepository,
    bidRepository,
    itemRepository,
}: autoBidArgs) => {
    return async function autoBid({ user, item, socket }: innerAutoBidArgs) {
        const users = await userRepository.list(0, 0, item, {});
        for (let _user of users) {
            const _item = await itemRepository.get(item);
            if (_user.autoBid.amount <= 0 ) {
                addNotification(_user, "Amount is not sufficient to continue auto bid")
                sendEmail(_user.email, _item)
                userRepository.update(_user.username, _user)
                continue
            }
            if (_user.username !== user) {
                const amount = _item.highest_bid;
                let _bid = new Bid(amount + 1, _user, _item, Date.now(), Date.now());
                const bidCreated: any = await bidRepository.create(_bid);

                if (bidCreated && bidCreated.acknowledged) {
                    await updateDb(itemRepository, item, _item, amount, _bid,
                                   bidRepository, bidCreated, userRepository, _user);
                    emailUsers(_user.username, _item.name, amount+1, userRepository, bidRepository)
                    socket.emit('bid-created-'+_item.name, _bid)
                } else 
                    console.log("Server could not create an auto bid");
            }
        }
    }
};

export default makeAutoBid

async function updateDb(
    itemRepository: ItemRepository,
    item: string,
    _item: Item,
    amount: number,
    _bid: Bid,
    bidRepository: BidRepository,
    bidCreated: any,
    userRepository: UserRepository,
    _user: User
) {
    _item = { ..._item, highest_bid: amount + 1 };
    await itemRepository.update(item, _item);

    _bid = { ..._bid, item: _item };
    await bidRepository.update(bidCreated.insertedIn, _bid);

    _user.autoBid.amount -= 1;

    percentageNotification(_user);
    userRepository.update(_user.username, _user);
}

function percentageNotification(_user: User) {
    const percentage = (_user.autoBid.amount / _user.autoBid.amountInitial) * 100;
    if (percentage <= _user.autoBid.percentage) {
        const notification = `Your auto bid amount has reached ${_user.autoBid.percentage}%`;
        addNotification(_user, notification);
    }
}

function addNotification(_user: User, notification: string) {
    if (_user.notifications)
        _user.notifications.unshift(notification);
    else
        _user.notifications = [notification];
}

async function sendEmail(userEmail: string, item:Item) {
    const text = `Auto bid was actived for ${item.name}, but the amount is not sufficient to continue` + 
                 `The item state is ${calculateItemState(item)}, the last bid on this item was ${item.highest_bid}$`
    const subject = "Not Enough Auto Bid Amount"
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
    const text = `An Auto bid was created on ${item} by another user, with the amount ${amount}$`
    const subject = "User Created New Auto Bid"
    emailUser({userEmail: usersEmails, subject, text})
}

function calculateItemState(item: Item) {
    if (item.close_at <= Date.now()) {
        return "Lost";
    }
    return "In Progress"
}