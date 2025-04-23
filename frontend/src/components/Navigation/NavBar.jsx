import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../services/auth';




const NavBar = ({ isAuth, onAuthChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onAuthChange(false);
    navigate('/');
  };




  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">FitTrack</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md">Home</Link>
            
            {isAuth ? (
              <>
                <Link to="/dashboard" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md">Dashboard</Link>
                <Link to="/workouts" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md">Workouts</Link>
                <Link to="/goals" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md">Goals</Link>
                <button 
                  onClick={handleLogout}
                  className="btn btn-secondary ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-600 hover:text-primary-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-secondary-100 px-2 pt-2 pb-4">
          <Link 
            to="/" 
            className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          {isAuth ? (
            <>
              <Link 
                to="/dashboard" 
                className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link 
                to="/workouts" 
                className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Workouts
              </Link>

              <Link 
                to="/goals" 
                className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Goals
              </Link>

              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md"
              >
                Logout
              </button>

            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};



NavBar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  onAuthChange: PropTypes.func.isRequired,
};

export default NavBar; 