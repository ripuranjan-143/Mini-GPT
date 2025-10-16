import {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      setLoading(false);
      return;
    }
    fetch(`http://localhost:8080/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        console.log('res = ', res);
        return res.json();
      })
      .then((data) => {
        setUserData(data.user); //same as backend has sent
        setCurrentUser(userId);
      })
      .catch(() => {
        localStorage.clear();
        navigate('/login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const value = { currentUser, setCurrentUser, userData, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
