import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Mobile Bill System
          </Link>
          <div className="space-x-4">
            {user ? (
              <>
                <Link
  to={user.role === "user" ? "/dashboard" : "/admin"}
  className="text-gray-600 hover:text-gray-900"
>
  {user.role === "user" ? "Dashboard" : "Admin"}
</Link>

                <Link to="/plans" className="text-gray-600 hover:text-gray-900">
                  Plans
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;