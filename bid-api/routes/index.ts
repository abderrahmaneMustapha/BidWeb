import { Router } from "express"
import image from "./image.routes"
import item from "./item.routes"

const router = Router()

router.use(image)
router.use(item)

export default router
