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
    return async function wonBid({ maxTime, minTime }: wonBidArgs) {
        const items = await itemRepository.list(0, 0, "", { maxTime, minTime });
        for (let i = 0; i < items?.length; i++) {
            const bid = await bidRepository.getMax(items[i].name);
            let user = await userRepository.get(bid.user.username);
            const bidExists = user.bills?.some((b) => b.item.name === bid.item.name);
            if(!bidExists) {
                addUserBill(user, bid)
                const updated = await userRepository.update(user.username, user);
                if (updated) {
                    sendEmail(user.email, bid.item.name)  // email the user who won
                    emailUsers(user.username, items[i].name, bid.amount, userRepository, bidRepository) // email users who lost
                } else {
                    console.log(`User ${user.username} has won the bid on the ${bid.item.name}, but the bill was not added`)
                }
            }
           
        }
    };
};

export default makeWonBid;

const addUserBill = (user: User, bid: Bid) => {
    if (user.bills) user.bills.push(bid);
    else user.bills = [bid];
};

const sendEmail  = (userEmail: string, itemName: string) => {
    const text = "Congratulations! You have successfully won the bid for the item " + itemName 
    const subject = "Bid Won"
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
    const text = `You have lost the bid on ${item}, the max bid amount was ${amount}$`
    const subject = "You Have lost the bid"
    emailUser({userEmail: usersEmails, subject, text})
}