import { createBid, listBid } from "../use-cases/bid";

export default Object.freeze({
    createBid: (req: any) => createBid(req),
    listBid: (req: any) => listBid(req),
});
