import express from "express";
import controller from "../controllers/bid.controllers"
import makeHttpCallback from "./utils/make-callback"

const router = express.Router();

router.route('/bid').post(makeHttpCallback(controller.createBid))

export default router
