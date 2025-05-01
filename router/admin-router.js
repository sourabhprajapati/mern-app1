const express=require("express");
const router=express.Router();
const adminController=require("../controllers/admin-controller");



router.get("/users",adminController.getAllUsers)
router.get("/contacts",adminController.getAllContacts)

module.exports=router;
