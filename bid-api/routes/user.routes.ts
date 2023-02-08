import express from "express";
import makeHttpCallback from "./utils/make-callback"
import controller from "../controllers/user.controllers"

const router = express.Router();

router.route('/auth').post(makeHttpCallback(controller.loginUser))

export default router