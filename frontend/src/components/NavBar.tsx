import { Link } from "react-router-dom";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; 

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Hamro Gaadi
            </Link>
            <div className="flex space-x-4 items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>

              
              {token && isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin Panel
                </Link>
              )}

              {token ? (
                <Link
                  to="/auth"
                  className="bg-red-400 text-white hover:bg-red-500 px-4 py-2 rounded-md text-sm font-medium"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("isAdmin"); 
                  }}
                >
                  Sign Out
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
