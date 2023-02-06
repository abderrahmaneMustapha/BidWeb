import { Bid } from "../../entities/models"
import BidRepository from "../../entities/repositories/mongo/bidRepository"

interface createBidArgs {
  bidRepository: BidRepository,
}

const makeCreateBid = ({bidRepository}: createBidArgs) => {
  return async function createBid({body, user}: any) {
    let [item, bid] = body
    bid = {user: user ,item: item, created_at: new Date(), updated_at: new Date(), ...bid}
    const _bid = new Bid(bid.amount, bid.user, bid.item, bid.date, bid.created_at, bid.updated_at)

    bidRepository.create(_bid)
  }
}

export default makeCreateBid
