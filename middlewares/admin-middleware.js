const adminMiddleware=async(req,res,next)=>{
    try {

        const adminRole=req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message:"Access denied"})
        }
        // res.status(200).json({msg:req.user.isAdmin})
        next();
    } catch (error) {
        next(error)
    }
}

module.exports=adminMiddleware;