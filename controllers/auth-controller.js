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

const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        // Add input validation
        if (!email || !password) {
            return res.status(400).json({msg: "Email and password are required"});
        }

        const userExist = await User.findOne({email});
        if (!userExist) {
            return res.status(400).json({msg: "Email does not exist"});
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            return res.status(401).json({msg: "Invalid email or password"});
        }
        
        return res.status(200).json({
            msg: "User logged in successfully",
            token: await userExist.generateToken(),
            userID: userExist._id.toString()
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};
    
const user=async(req,res)=>{
  try {
    const userData=req.user;
    console.log(userData);
    return res.status(200).json({ userData});
  } catch (error) {
    console.log(`error from the user controller ${error}`);
}
}
module.exports={home, register,login,user}