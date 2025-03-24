const User=require("../models/user-model")
const home=async(req,res)=>{
    try {
        res.status(200).send("Hello sourabh")
    } catch (error) {
        console.log(error)
        
    }
}

const register= async(req,res)=>{
    try {
        const { username, email, phone, password } = req.body;

        // Check if email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" }); // Use return to stop execution
        }

        // Create new user
        const newUser = await User.create({ username, email, phone, password });

        // Send success response
        return res.status(201).json({ msg: "User registered successfully", data: newUser });
    } catch (error) {
        console.log("Register Error:", error); // Log the error for debugging
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}
module.exports={home, register}