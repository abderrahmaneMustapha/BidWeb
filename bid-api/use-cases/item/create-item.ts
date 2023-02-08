import { Item, User } from "../../entities/models";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface createItemArgs {
    itemRepository: ItemRepository;
}

const makeCreateItem = ({ itemRepository }: createItemArgs) => {
    return async function createItem({ body, user }: any) {
        let { name, description, close_at, image } = body;
        user = user as User;
        let _item = new Item(
            name,
            description,
            image,
            new Date(close_at).getTime(),
            user,
            Date.now(),
            Date.now(),
            0,
        );
        const res = await itemRepository.create(_item);
        if (!res) {
            throw new Error("Could not create item");
        }
        return res;
    };
};

export default makeCreateItem;
