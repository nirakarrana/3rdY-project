import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import axios from 'axios';

type car = {
  name: string;
  location: string;
  price: number;
  numberOfSeats: number;
  description: string;
  image: string;
};

function Home() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/auth';
  }

  const [admin, isAdmin] = React.useState(false);

  React.useEffect(() => {
    getData();
    isAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const [data, setData] = useState([] as car[]);

  const getData = async () => {
    await axios
      .get(import.meta.env.VITE_BACKEND_URL + '/car/getCar', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if (res) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white">
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Available Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.map((car, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                    <p className="text-gray-600 mb-4">{car.location}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-blue-600">
                        <h3>
                          Rs. {car.price}
                          <span className="text-sm text-gray-600">/day</span>{' '}
                        </h3>
                      </p>
                    </div>
                    <button
                      onClick={() => (window.location.href = '/reserve')}
                      className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 group"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;