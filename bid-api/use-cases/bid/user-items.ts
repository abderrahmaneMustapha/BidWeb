import { Bid, User } from "../../entities/models";
import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface makeUserItemsArgs {
    bidRepository: BidRepository;
    itemRepository: ItemRepository;
}

const makeUserItems = ({
    bidRepository,
    itemRepository,
}: makeUserItemsArgs) => {
    return async function userItems({ user }: any) {
        const items = await bidRepository.userItems(user.username);
        const existingItems = await itemRepository.items();
        const result = [];

        for (let i = 0; i < items?.length; i++) {
            if (!existingItems.includes(items[i])) continue;

            const bid:any = await bidRepository.getMax(items[i], {
                "user.username": user.username,
            });
            const maxBid = await bidRepository.getMax(items[i])
            const item = await itemRepository.get(bid.item.name)
            bid.item = item
            bid.maxAmount = maxBid.amount
            result.push(calculateItemState(bid, maxBid, user));
        }

        return result;
    };
};

export default makeUserItems;

function calculateItemState(bid: Bid, maxBid:Bid , user: User) {
    const res: any = bid;
    if (bid.item.close_at <= Date.now()) {
        if (user.bills?.some((b) => b.item.name === bid.item.name) || user.username === maxBid.user.username) {
            res.state = "Won";
        } else {
            res.state = "Lost";
        }
    } else {
      res.state = "In Progress"
    }

    return res
}
