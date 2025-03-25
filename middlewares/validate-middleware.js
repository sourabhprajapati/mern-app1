const validate =(schema)=>async(req,res,next)=>{
    try {
        const parseBody=await schema.parsAsync(req.body);
        req.body=parseBody;
        next();
    } catch (error) {
        res.status(400).json({msg:error})
    }
}
module.exports = validate;