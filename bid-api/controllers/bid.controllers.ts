import { createBid } from "../use-cases/bid";

export default Object.freeze({
    createBid: (req: any) => createBid(req),
});
