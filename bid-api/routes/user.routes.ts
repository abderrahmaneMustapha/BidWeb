import express from "express";
import makeHttpCallback from "./utils/make-callback"
import controller from "../controllers/user.controllers"
import makeAuth from "./utils/make-auth"
import { authUser } from "../use-cases/user"

const router = express.Router();

router.route('/auth').post(makeHttpCallback(controller.loginUser))
router.route('/register').post(makeHttpCallback(controller.registerUser))
router.patch('/user', makeAuth(authUser), makeHttpCallback(controller.updateUser))
router.get('/user', makeAuth(authUser), makeHttpCallback(controller.getUser))
router.get('/user/notifications', makeAuth(authUser), makeHttpCallback(controller.notifyUser))


export default router