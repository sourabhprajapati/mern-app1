const express=require("express");
const router=express.Router();
const authController =require('../controllers/auth-controller')
const signupSchema=require("../validators/auth-validator")
const validate=require('../middlewares/validate-middleware')
const authMiddleware=require("../middlewares/auth-middleware")
router.get("/", authController.home)

router.post("/register",validate(signupSchema),authController.register)
router.post("/login",authController.login)
router.get("/user",authMiddleware,authController.user)


module.exports=router;
