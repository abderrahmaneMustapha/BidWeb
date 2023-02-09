import { Bid, Item, User } from "../../entities/models";
import UserRepository from "../../entities/repositories/memory/userRepository";
import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface autoBidArgs {
    userRepository: UserRepository;
    bidRepository: BidRepository;
    itemRepository: ItemRepository;
}

interface innerAutoBidArgs {
    user: string;
    item: string;
}

const makeAutoBid = ({
    userRepository,
    bidRepository,
    itemRepository,
}: autoBidArgs) => {
    return async function autoBid({ user, item }: innerAutoBidArgs) {
        const users = await userRepository.list(0, 0, item, 1, 0, 0);
        for (let _user of users) {
            if (_user.autoBid.amount <= 0 ) {
                addNotification(_user, "Amount is not sufficient to continue auto bid")
                userRepository.update(_user.username, _user)
                continue
            }
            if (_user.username !== user) {
                const _item = await itemRepository.get(item);
                const amount = _item.highest_bid;

                let _bid = new Bid(amount + 1, _user, _item, Date.now(), Date.now());
                const bidCreated: any = await bidRepository.create(_bid);

                if (bidCreated && bidCreated.acknowledged) {
                    await updateDb(itemRepository, item, _item, amount, _bid,
                                   bidRepository, bidCreated, userRepository, _user);
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
        _user.notifications.push(notification);
    else
        _user.notifications = [notification];
}

