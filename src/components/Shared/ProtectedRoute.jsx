import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAuth, children }) => {
  if (!isAuth) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  
  return children;
};

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute; 