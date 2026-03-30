import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Redirects to the unified Auth page
const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/auth', { replace: true });
    }
  }, [user, navigate]);

  return null;
};

export default Login;
