import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import db from "../../entities/repositories/mongo/utils/mongoConnection";
import makeCreateItem from "./create-item";
import makeDeleteItem from "./delete-item";
import makeGetItem from "./get-item";
import makeListItem from "./list-item";
import makeUpdateItem from "./update-item";


const itemRepository = new ItemRepository(db)

const createItem = makeCreateItem({itemRepository: itemRepository})
const listItem = makeListItem({itemRepository: itemRepository})
const deleteItem = makeDeleteItem({itemRepository: itemRepository})
const updateItem = makeUpdateItem({itemRepository: itemRepository})
const getItem = makeGetItem({itemRepository: itemRepository})

export default Object.freeze({
  createItem,
  listItem,
  getItem,
  deleteItem,
  updateItem
})

export { createItem, listItem, getItem, deleteItem, updateItem }