import { Item, User } from "../../entities/models";
import ItemRepository from "../../entities/repositories/mongo/itemRepository";

interface createItemArgs {
    itemRepository: ItemRepository;
}

const makeCreateItem = ({ itemRepository }: createItemArgs) => {
    return async function createItem({ body }: any) {
        let { name, description, close_at, image } = body;
        let user = new User(
            "user",
            "password",
            false,
            new Date(),
            new Date()
        );
        const item = {
            created_by: user,
            created_at: new Date(),
            updated_at: new Date(),
            name,
            description,
            close_at: new Date(close_at),
            image,
        };
        let _item = new Item(
            item.name,
            item.description,
            item.image,
            item.close_at,
            item.created_by,
            item.created_at,
            item.updated_at
        );

        itemRepository.create(_item);
    };
};

export default makeCreateItem;
