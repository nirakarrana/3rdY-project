import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must be of at least 3 Characters."],
    maxLength: [30, "First name cannot exceed 30 Characters."],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must be of at least 3 Characters."],
    maxLength: [30, "Last name cannot exceed 30 Characters."],
  },
  email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Provide a valid email"],
    },
    phone: {
      type: String,
      required: true,
      minLength: [10, "Phone number must contain 10 Digits."],
      maxLength: [10, "Phone number must contain 10 Digits."],
    },
    password:{
        type: String,
    required: true,
    minLength: [8, "Password must contain 8 Characters."],
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    });

    
    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      });
    export const User = mongoose.model("User", userSchema);