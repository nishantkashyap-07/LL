import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Redirects to the unified Auth page (signup tab)
const SignUp = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/auth', { replace: true, state: { tab: 'signup' } });
    }
  }, [user, navigate]);

  return null;
};

export default SignUp;
