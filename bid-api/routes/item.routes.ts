import { Router } from "express"
import makeCallback from "./utils/make-callback"
import controller from "../controllers/item.controllers"

const router = Router()

router.route('/item').post(makeCallback(controller.createItem))
router.route('/item').get(makeCallback(controller.listItem))
router.route('/item/:name').delete(makeCallback(controller.deleteItem))

export default router