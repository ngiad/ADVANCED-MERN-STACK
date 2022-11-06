import express from "express"
import { getUser, loginUser, logout, registerUser,loginStauts, ForgotPassword, UpdatePassword, createShop } from "../controllers/userControllers.js"
import { protect } from "../middleWare/authMiddleware.js"

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/forgotpassword",ForgotPassword)
router.post("/updatepassword",UpdatePassword)
router.get("/logout",logout)
router.get("/getuser",protect,getUser)
router.get("/loggedin",loginStauts)
router.post("/createShop",protect,createShop)

export default router