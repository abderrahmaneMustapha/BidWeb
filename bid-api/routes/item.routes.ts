import { Router } from "express"
import makeCallback from "./utils/make-callback"
import makeAuth from "./utils/make-auth"
import { authUser, authAdmin } from "../use-cases/user"
import controller from "../controllers/item.controllers"


const router = Router()
router.post('/item', makeAuth(authAdmin), makeCallback(controller.createItem))
router.get('/item', makeAuth(authUser), makeCallback(controller.listItem))

router.get('/item/:name', makeAuth(authUser), makeCallback(controller.getItem))
router.delete('/item/:name', makeAuth(authAdmin), makeCallback(controller.deleteItem))
router.patch('/item/:name', makeAuth(authAdmin), makeCallback(controller.updateItem))

export default router