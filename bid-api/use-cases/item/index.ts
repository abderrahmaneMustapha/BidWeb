import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import MongoConnection from "../../entities/repositories/mongo/utils/mongoConnection";
import makeCreateItem from "./create-item";
import makeDeleteItem from "./delete-item";
import makeListItem from "./list-item";

const db = MongoConnection.getInstance()
const itemRepository = new ItemRepository(db)

const createItem = makeCreateItem({itemRepository: itemRepository})
const listItem = makeListItem({itemRepository: itemRepository})
const deleteItem = makeDeleteItem({itemRepository: itemRepository})

export default Object.freeze({
  createItem,
  listItem,
  deleteItem
})

export { createItem, listItem, deleteItem }