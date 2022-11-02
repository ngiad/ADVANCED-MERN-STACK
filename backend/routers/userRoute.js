import express from "express"
import { getUser, loginUser, logout, registerUser,loginStauts } from "../controllers/userControllers.js"
import { protect } from "../middleWare/authMiddleware.js"

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logout)
router.get("/getuser",protect,getUser)
router.get("/loggedin",loginStauts)

export default router