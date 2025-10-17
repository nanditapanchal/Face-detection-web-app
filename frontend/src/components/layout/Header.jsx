import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-xl hover:text-blue-200 transition-colors cursor-pointer">
        Face Detection Web Application
      </h1>
      <nav className="space-x-4 flex items-center">
        {user ? (
          <>
            <Link
              to="/face-detect"
              className="px-3 py-1 rounded hover:bg-blue-500 transition-colors"
            >
              Detect
            </Link>
            <Link
  to="/dashboard"
  className="px-3 py-1 rounded hover:bg-blue-500 transition-colors"
>
  Dashboard
</Link>

            <button
              onClick={handleLogout}
              className="ml-2 bg-red-500 hover:bg-red-600 transition-colors px-3 py-1 rounded shadow-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 rounded hover:bg-blue-500 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 rounded hover:bg-blue-500 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
