import BidRepository from "../../entities/repositories/mongo/bidRepository";

interface listBidArgs {
    bidRepository: BidRepository;
}

const makeListBid = ({ bidRepository }: listBidArgs) => {
    return async function listBid({ query }: any) {
        const { limit, skip, name } = query;
        const result = await bidRepository.list(
            parseInt(limit),
            parseInt(skip),
            name,
            1,
            0,
            0
        );
        const count = await bidRepository.count(name);
        return { data: result, count };
    };
};

export default makeListBid;
