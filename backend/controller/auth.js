import { response } from "express";
import {User} from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 



export const signup = async(req,res)=> {
    try {
        const { firstName,lastName, email, phone, password } = req.body;
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ firstName,lastName, phone, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    }

 catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }

}


export const getAllUsers = async (req, res) => {
  try {
    
    const user = await User.findById(req.user);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await User.find({}, "-password"); 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const signin = async(req,res)=> {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ message: "Login successful", token, admin:user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }


}
