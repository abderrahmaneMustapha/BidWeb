import BidRepository from "../../entities/repositories/mongo/bidRepository";

interface makeHighestBidArgs {
  bidRepository: BidRepository;
}

const makeHighestBid = ({
  bidRepository,
}: makeHighestBidArgs) => {
  return async function hgihestBid({ params }: any) {
      const { name } = params;
      return await bidRepository.getMax(name);
  };
};

export default makeHighestBid
