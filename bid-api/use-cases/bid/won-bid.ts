import { Bid, User } from "../../entities/models";
import UserRepository from "../../entities/repositories/memory/userRepository";
import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import { emailUser } from "../email";

interface makeWonBidArgs {
    bidRepository: BidRepository;
    itemRepository: ItemRepository;
    userRepository: UserRepository;
}

interface wonBidArgs {
    maxTime: number;
    minTime: number;
}

const makeWonBid = ({
    bidRepository,
    itemRepository,
    userRepository,
}: makeWonBidArgs) => {
    return async function hgihestBid({ maxTime, minTime }: wonBidArgs) {
        const items = await itemRepository.list(0, 0, "", { maxTime, minTime });
        for (let i = 0; i < items?.length; i++) {
            const bid = await bidRepository.getMax(items[i].name);
            let user = await userRepository.get(bid.user.username);
            addUserBill(user, bid)
            userRepository.update(user.username, user);
        }
    };
};

export default makeWonBid;

const addUserBill = (user: User, bid: Bid) => {
    const bidExists = user.bills?.some((b) => b.item.name === bid.item.name);
    if (bidExists) return;
    sendEmail(user.email, bid.item.name)
    if (user.bills) user.bills.push(bid);
    else user.bills = [bid];
};

const sendEmail  = (userEmail: string, itemName: string) => {
    const text = "Congratulations! You have successfully won the bid for the item" + itemName 
    const subject = "Bid Won"
    emailUser({userEmail, subject, text})
}
