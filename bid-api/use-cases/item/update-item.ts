import { Item, User } from "../../entities/models";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface updateItemArgs {
    itemRepository: ItemRepository;
}

const makeUpdateItem = ({ itemRepository }: updateItemArgs) => {
    return async function updateItem({ body, params, socket }: any) {
        const { name } = params;
        let { name: dbName, description, close_at, image } = body;
        const item = new Item(dbName, description, image, new Date(close_at).getTime(), {} as User,
                              0, new Date().getTime(),0,);
        const res = await itemRepository.update(name, item);
        if (!res) {
            throw new Error("Could not update item");
        }
        const updatedItem = await itemRepository.get(name)
        socket.emit('item-updated-'+name, updatedItem)
        return updatedItem;
    };
};

export default makeUpdateItem;
