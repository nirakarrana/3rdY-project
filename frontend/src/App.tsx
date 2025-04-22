import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AddCar from './pages/AddCar';
import Reserve from './pages/ReserveCar';
import AdminPanel from './pages/AdminPanel';
import CarDetails from "./pages/CarDetails";
import ReservationDetails from "./pages/ReservationDetails";
import UserDetails from "./pages/UserDetails";



function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/car-details" element={<CarDetails />} />
        <Route path="/reservation-details" element={<ReservationDetails />} />
        <Route path="/user-details" element={<UserDetails />} />
     </Routes>
    </Router>
  );
}

export default App;
