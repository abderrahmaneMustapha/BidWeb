import { Item } from "../../entities/models";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface getItemArgs {
    itemRepository: ItemRepository;
}

const makeGetItem = ({ itemRepository }: getItemArgs) => {
    return async function getItem({ params }: any) {
        const { name } = params;
        const result = await itemRepository.get(name);
        return result;
    };
};

export default makeGetItem;
