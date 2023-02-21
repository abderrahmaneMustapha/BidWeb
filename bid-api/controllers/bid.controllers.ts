import { createBid, highestBid, listBid, userItems } from "../use-cases/bid";

export default Object.freeze({
    createBid: (req: any) => createBid(req),
    listBid: (req: any) => listBid(req),
    highestBid: (req: any) => highestBid(req),
    userItems: (req: any) => userItems(req),
});
