import { useNavigate } from 'react-router-dom';
import { Plus, ClipboardList, Users, Car } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div
          className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
          onClick={() => navigate('/car-details')}
        >
          <Car className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-center">Car Details</h2>
        </div>

        
        <div
          className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
          onClick={() => navigate('/reservation-details')}
        >
          <ClipboardList className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-center">Reservation Details</h2>
        </div>

        
        <div
          className="bg-purple-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
          onClick={() => navigate('/user-details')}
        >
          <Users className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-center">User Details</h2>
        </div>

        
        <div
          className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
          onClick={() => navigate('/add-car')}
        >
          <Plus className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-center">Add Car</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;