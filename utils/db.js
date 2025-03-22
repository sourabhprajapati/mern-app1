const mongoose=require('mongoose');

const URL=process.env.MONGODB_URL;

const connectDB=async()=>{
    try {
        await mongoose.connect(URL);
        console.log("coonection sucessful with DB")
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB