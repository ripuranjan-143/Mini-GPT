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
        return res.json();
      })
      .then((data) => {
        setUserData(data.user);
        setCurrentUser(userId);
      })
      .catch(() => {
        logout();
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setCurrentUser(null);
    setUserData(null);
    navigate('/login');
  };

  const deleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!userData?._id) return alert('No user found');
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${userData._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert('Error while deleting account');
        return;
      }
      logout();
      alert('Your account has been deleted successfully!');
    } catch (error) {
      console.log(error);
      alert('Error while deleting the user');
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    userData,
    loading,
    logout,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
