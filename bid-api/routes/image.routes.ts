import express from "express"
import controller from "../controllers/image.controllers"
import makeHttpCallback from "./utils/make-callback"
import makeAuth from "./utils/make-auth"
import { authAdmin } from "../use-cases/user"

const router = express.Router()
router.post("/image", makeAuth(authAdmin), makeHttpCallback(controller.createImage))
router.delete("/image", makeAuth(authAdmin), makeHttpCallback(controller.removeImage))

export default router