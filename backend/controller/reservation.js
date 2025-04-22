import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { Reservation } from "../models/reservationSchema.js";


export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    const user = await User.findById(req.user);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Server error while fetching reservations" });
  }
};


export const sendReservation = async (req, res, next) => {
  console.log("Request body received:", req.body);

  const { firstName, lastName, email, indate, outdate, phone, guests } = req.body;

  if (!firstName || !lastName || !email || !indate || !outdate || !phone || !guests) {
    console.error("Missing required fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const formData = {
      firstName,
      lastName,
      email,
      indate: new Date(indate), 
      outdate: new Date(outdate), 
      phone,
      guests,
    };

    const reservation = await Reservation.create(formData);

    console.log("Reservation created successfully:", reservation);

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Server error while creating reservation" });
  }
};

// Update a reservation
export const updateReservation = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, indate, outdate, phone, guests } = req.body;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return next(new ErrorHandler("Reservation not found", 404));
    }

    reservation.firstName = firstName || reservation.firstName;
    reservation.lastName = lastName || reservation.lastName;
    reservation.email = email || reservation.email;
    reservation.indate = indate || reservation.indate;
    reservation.outdate = outdate || reservation.outdate;
    reservation.phone = phone || reservation.phone;
    reservation.guests = guests || reservation.guests;

    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Reservation updated successfully",
      reservation,
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ message: "Server error while updating reservation" });
  }
};

// Delete a reservation
export const deleteReservation = async (req, res) => {
  console.log("Deleting reservation with ID:", req.params.id);

  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      console.error("Reservation not found");
      return res.status(404).json({ message: "Reservation not found" });
    }

    console.log("Reservation deleted successfully:", reservation);
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ message: "Server error while deleting reservation" });
  }
};

