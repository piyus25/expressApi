const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async(req,res)=>{
    //Check if user already exixts
    const {username, email, password} = req.body;
    
    try {
        const existingUser = await userModel.findOne({email : email});
        if(existingUser){
            res.status(400).json({
                msg:"User already exists"
            });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a user record or document(in json language) to upload in Database
        const result = await userModel.create({
            username:username,
            email:email,
            password:hashedPassword
        });

        // Token generation for user to maintain user's session 
        const token = jwt.sign({email:result.email, id:result._id}, SECRET_KEY)
        res.status(201).json({
            user: result,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Something went wrong"
        });
    }
}

const signin = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email : email});
        if(!existingUser){
            res.status(404).json({
                msg:"User Not Found"
            });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            res.status(400).json({
                msg:"Invalid Credentials"
            })
        }
        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, SECRET_KEY);
        res.status(201).json({
            user: existingUser,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Something went wrong"
        });
    }
}

module.exports = {signup, signin};