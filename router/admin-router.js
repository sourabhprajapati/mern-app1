const express=require("express");
const router=express.Router();
const adminController=require("../controllers/admin-controller");
const authMiddleware=require("../middlewares/auth-middleware")
const adminMiddleware=require("../middlewares/admin-middleware")
router.get("/users",authMiddleware,adminMiddleware,adminController.getAllUsers)
router.get("/contacts",authMiddleware,adminController.getAllContacts)
router.get("/users/:id",authMiddleware,adminMiddleware,adminController.getUserById)
router.patch("/users/update/:id",authMiddleware,adminMiddleware,adminController.updateUserById)

router.delete("/users/delete/:id",authMiddleware,adminMiddleware,adminController.deleteUserById)
router.delete("/contacts/delete/:id",authMiddleware,adminMiddleware,adminController.deleteContactById)

module.exports=router;
