import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface listItemArgs {
  itemRepository: ItemRepository;
}

const makeListItem = ({ itemRepository }: listItemArgs) => {
  return async function listItem({ query }: any) {
    const { limit, skip } = query
    const result = await itemRepository.list(parseInt(limit), parseInt(skip))
    const count = await itemRepository.count()
    return  { data: result, count}
  }
}

export default makeListItem