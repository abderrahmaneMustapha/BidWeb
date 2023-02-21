import express from "express";
import controller from "../controllers/bid.controllers"
import makeHttpCallback from "./utils/make-callback"
import makeAuth from "./utils/make-auth"
import { authUser } from "../use-cases/user"

const router = express.Router();
router.post('/bid', makeAuth(authUser), makeHttpCallback(controller.createBid))
router.get('/bid', makeAuth(authUser), makeHttpCallback(controller.listBid))
router.get('/bid/:name/max', makeAuth(authUser), makeHttpCallback(controller.highestBid))
router.get('/bid/user', makeAuth(authUser), makeHttpCallback(controller.userItems))
export default router
