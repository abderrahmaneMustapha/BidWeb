import { createItem, listItem, deleteItem, updateItem, getItem } from "../use-cases/item";

export default Object.freeze({
    createItem: (req: any) => createItem(req),
    listItem: (req: any) => listItem(req),
    getItem: (req: any) => getItem(req),
    deleteItem: (req: any) => deleteItem(req),
    updateItem: (req: any) => updateItem(req),
});
