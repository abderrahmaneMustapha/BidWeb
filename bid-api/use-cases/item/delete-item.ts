import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface deleteItemArgs {
  itemRepository: ItemRepository;
}

const makeDeleteItem = ({ itemRepository }: deleteItemArgs) => {
    return async function deleteItem({ params }: any) {
        const { name } = params

        const res = await itemRepository.delete(name)
        if (!res) {
            throw new Error("Could not delete the item")
        } 
        return res
    }
}

export default makeDeleteItem