const home=async(req,res)=>{
    try {
        res.status(200).send("Hello sourabh")
    } catch (error) {
        console.log(error)
        
    }
}

const register= async(req,res)=>{
    try {
        res.status(200).send({msg:req.body})
    } catch (error) {
        res.status(400).send({msg:"page is not found"})
    }
}
module.exports={home, register}