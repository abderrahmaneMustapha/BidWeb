import IBaseRepository from "./baseRepository";
import { Item } from "../../models";

interface IItemRepository extends IBaseRepository<Item> {
  
}

export default IItemRepository