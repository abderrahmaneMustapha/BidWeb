import { Bid, User } from "../../entities/models";
import BidRepository from "../../entities/repositories/mongo/bidRepository";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface createBidArgs {
    bidRepository: BidRepository;
    itemRepository: ItemRepository;
}

const makeCreateBid = ({ bidRepository, itemRepository }: createBidArgs) => {
    return async function createBid({ body }: any) {
        let {amount, item} = body;
        let user = new User("user9", "password", false, Date.now(), Date.now());
        let _bid = new Bid(
            parseInt(amount),
            user,
            item,
            Date.now(),
            Date.now()
        );
        const max = await bidRepository.getMax(item.name)
        if(max && max.user.username === user.username) {
            throw new Error("User already have the highest bid")
        }
        if(max && max.amount >= parseInt(amount)) {
            throw new Error("User can not bid, max bid is larger than your bid") 
        }
        const bidCreated:any = await bidRepository.create(_bid);
        if (bidCreated && bidCreated.acknowledged) {
            let _item = await itemRepository.get(item.name)
            _item = {..._item, highest_bid: parseInt(amount)}
            await itemRepository.update(item.name, _item)
            _bid = {..._bid, item: _item}
            await bidRepository.update(bidCreated.insertedIn, _bid)
        } else {
            throw new Error("Server could not create a bid")
        }
    };
};

export default makeCreateBid;
