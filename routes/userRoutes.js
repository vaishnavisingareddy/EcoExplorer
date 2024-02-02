const express=require("express")
const { getAllUsers, loginController, registerController } = require("../controllers/userController")

const router=express.Router()
router.get('/all-users',getAllUsers)
router.post('/login',loginController)
router.post('/register',registerController)

module.exports=router