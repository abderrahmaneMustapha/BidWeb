import { createItem, listItem, deleteItem } from "../use-cases/item";

export default Object.freeze({
    createItem: (req: any) => createItem(req),
    listItem: (req: any) => listItem(req),
    deleteItem: (req: any) => deleteItem(req),
});
