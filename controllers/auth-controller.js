const User=require("../models/user-model")
const bcrypt = require('bcrypt');



const home = async (req, res) => {
    try {
        res.status(200).send("Hello sourabh");
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const register = async (req, res,next) => {
    try {
        const { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(400).json({ msg: "Please provide all required fields" });
        }

        // Check if email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const hash_password = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ username, email, phone, password: hash_password });

        // Send success response
        return res.status(201).json({ msg: "User registered successfully", token: await newUser.generateToken(), userID: newUser._id.toString() });
    } catch (error) {
        // console.error("Register Error:", error);
        // res.status(500).json({ msg: "Internal server error", error: error.message });
        next(error)
    }
}

const login =async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userExist=await User.findOne({email})
        if(!userExist){
            return res.status(400).json({msg:"Email does not exist"})
        }
        const user=await bcrypt.compare(password,userExist.password)
        if(user){
            return res.status(201).json({ msg: "User Login successfully", token: await  userExist.generateToken(), userID:  userExist._id.toString() });

        }else{
            res.status(401).json({msg:"Invalid email and password"})
        }
        
    } catch (error) {
        res.status(500).json("internal server error")
    }
}
    
module.exports={home, register,login}