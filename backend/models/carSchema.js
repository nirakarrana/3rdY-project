import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  numberOfSeats: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  
 
}); 

export const Car = mongoose.model("Car", carSchema);

