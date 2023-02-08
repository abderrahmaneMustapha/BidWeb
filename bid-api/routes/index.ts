import { Router } from "express"
import image from "./image.routes"
import item from "./item.routes"
import bid from "./bid.routes"

const router = Router()

router.use(image)
router.use(item)
router.use(bid)

export default router
