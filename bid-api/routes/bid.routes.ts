import express from "express";
import controller from "../controllers/bid.controllers"
import makeHttpCallback from "./utils/make-callback"
import makeAuth from "./utils/make-auth"
import { authUser, authAdmin } from "../use-cases/user"

const router = express.Router();
router.post('/bid', makeAuth(authUser), makeHttpCallback(controller.createBid))
router.get('/bid', makeAuth(authAdmin), makeHttpCallback(controller.listBid))
router.get('/bid/:name/max', makeAuth(authUser), makeHttpCallback(controller.highestBid))

export default router
