import { createItem } from "../use-cases/item";

export default Object.freeze({
  createItem: (req: any) => createItem(req)
})
