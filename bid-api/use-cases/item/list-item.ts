import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface listItemArgs {
    itemRepository: ItemRepository;
}

const makeListItem = ({ itemRepository }: listItemArgs) => {
    return async function listItem({ query }: any) {
        const { limit, skip, search, sort, open, bidSort } = query;
        const result = await itemRepository.list(
            parseInt(limit),
            parseInt(skip),
            search,
            {sort: (parseInt(sort) as 1 | -1) || -1,
            open: (parseInt(open) as 1 | -1 | 0) || 0,
            bidSort: (parseInt(bidSort) as 1 | -1 | 0) || 0,}
        );
        const count = await itemRepository.count(
            search,
            (parseInt(open) as 1 | -1 | 0) || 0
        );
        return { data: result, count };
    };
};

export default makeListItem;
