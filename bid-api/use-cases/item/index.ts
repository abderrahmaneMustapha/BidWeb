import ItemRepository from "../../entities/repositories/mongo/itemRepository";
import MongoConnection from "../../entities/repositories/mongo/utils/mongoConnection";
import makeCreateItem from "./create-item";

const db = MongoConnection.getInstance()
const itemRepository = new ItemRepository(db)

const createItem = makeCreateItem({itemRepository: itemRepository})

export default Object.freeze({
  createItem
})

export { createItem }