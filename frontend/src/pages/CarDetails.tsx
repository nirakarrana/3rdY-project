import React, { useEffect, useState } from "react";

const CarDetails = () => {
  interface Car {
    _id: string;
    name: string;
    location: string;
    price: number;
    numberOfSeats: number;
    description: string;
  }

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCar, setEditingCar] = useState<Car | null>(null); 
  const [formData, setFormData] = useState<Partial<Car>>({}); 

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in as an admin to access this page.");
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        const baseUrl = "http://localhost:4000/api/v1";
        const res = await fetch(`${baseUrl}/car/getCar`, { method: "GET", headers });

        if (!res.ok) throw new Error("Failed to fetch cars");

        const data = await res.json();
        setCars(data);
        setError("");
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleEditClick = (car: Car) => {
    setEditingCar(car);
    setFormData(car); 
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!editingCar) return;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const baseUrl = "http://localhost:4000/api/v1";
      const res = await fetch(`${baseUrl}/car/updateCar/${editingCar._id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update car");

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

  const handleDelete = async (carId: string) => {
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
      const res = await fetch(`${baseUrl}/car/deleteCar/${carId}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) throw new Error("Failed to delete car");

      
      setCars((prev) => prev.filter((car) => car._id !== carId));
    } catch (err) {
      console.error("Error deleting car:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Car Details</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Car Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Types</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Number of Seats</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{car.name}</td>
              <td className="border border-gray-300 px-4 py-2">{car.location}</td>
              <td className="border border-gray-300 px-4 py-2">{car.price}</td>
              <td className="border border-gray-300 px-4 py-2">{car.numberOfSeats}</td>
              <td className="border border-gray-300 px-4 py-2">{car.description}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleEditClick(car)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(car._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCar && (
        <div className="mt-6 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-4">Update Car</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Car Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleFormChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Types</label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleFormChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleFormChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Number of Seats</label>
              <input
                type="number"
                name="numberOfSeats"
                value={formData.numberOfSeats || ""}
                onChange={handleFormChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleFormChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
              onClick={() => setEditingCar(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;