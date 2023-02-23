import { Router } from "express"
import image from "./image.routes"
import item from "./item.routes"
import bid from "./bid.routes"
import user from "./user.routes"
import doc from "./doc.routes"

const router = Router()

router.use(image)
router.use(item)
router.use(bid)
router.use(user)
router.use(doc)

export default router
