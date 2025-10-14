import { useRoutes, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import Signup from './auth/Signup.jsx';
import Login from './auth/Login.jsx';
import { useAuth } from '../src/Context/AuthContext.jsx';
import { useEffect } from 'react';

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }
    if (
      !userIdFromStorage &&
      !['/login', '/signup'].includes(window.location.pathname)
    ) {
      navigate('/login');
    }

    if (userIdFromStorage && window.location.pathname === '/login') {
      navigate('/');
    }
  }, [currentUser, navigate, setCurrentUser]);
  let element = useRoutes([
    {
      path: '/',
      element: (
        <div style={{ backgroundColor: 'black' }} className="black">
          <div className="">
            <Sidebar />
          </div>
          <div className="">
            <ChatWindow />
          </div>
        </div>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
  ]);
  return element;
};

export default ProjectRoutes;
