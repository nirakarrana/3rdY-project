import {Car} from "../models/carSchema.js";



export const createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({ message: "Car created successfully", car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getCars = async (req, res) => {
  console.log("Fetching cars...");
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Server error while fetching cars" });
  }
};


export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateCar = async (req, res) => {
  console.log("Updating Car with ID:", req.params.id);
  console.log("Request body:", req.body);

  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Server error while updating car" });
  }
};


export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handlecar = async () => {
  if (!editingCar) return;

  const token = localStorage.getItem("token");

  if (!token) {
    setError("You must be logged in as an admin to access this page.");
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const baseUrl = "http://localhost:4000/api/v1";
    const res = await fetch(`${baseUrl}/car/update/${editingCar._id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to update Car");
    }

    const updatedCar = await res.json();

    
    setCars((prev) =>
      prev.map((car) => (car._id === updatedCar._id ? updatedCar : car))
    );

    setEditingCar(null);
    setFormData({});
  } catch (err) {
    console.error("Error updating car:", err);
    setError(err instanceof Error ? err.message : "An unknown error occurred");
  }
};
