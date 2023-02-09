import express from "express";
import makeHttpCallback from "./utils/make-callback"
import controller from "../controllers/user.controllers"
import makeAuth from "./utils/make-auth"
import { authUser } from "../use-cases/user"

const router = express.Router();

router.route('/auth').post(makeHttpCallback(controller.loginUser))
router.patch('/user', makeAuth(authUser), makeHttpCallback(controller.updateUser))
router.get('/user', makeAuth(authUser), makeHttpCallback(controller.getUser))

export default router