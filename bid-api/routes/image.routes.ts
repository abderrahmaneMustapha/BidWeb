import express from "express"
import controller from "../controllers/image.controllers"
import makeHttpCallback from "./utils/make-callback"

const router = express.Router()

router.route("/image").post(makeHttpCallback(controller.createImage))
router.route("/image").delete(makeHttpCallback(controller.removeImage))

export default router