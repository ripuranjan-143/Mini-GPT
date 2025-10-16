import { useRoutes, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext.jsx';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';

const ProjectRoutes = () => {
  const { currentUser, loading } = useAuth();

  const routes = useRoutes([
    {
      path: '/',
      element: currentUser ? (
        <div style={{ display: 'flex', backgroundColor: 'black' }}>
          <Sidebar />
          <ChatWindow />
        </div>
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: '/login',
      element: !currentUser ? <Login /> : <Navigate to="/" replace />,
    },
    {
      path: '/signup',
      element: !currentUser ? (
        <Signup />
      ) : (
        <Navigate to="/" replace />
      ),
    },
    {
      path: '*',
      element: <Navigate to={currentUser ? '/' : '/login'} replace />,
    },
  ]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '100vh',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <h4>Loading...</h4>
      </div>
    );
  }
  return routes;
};

export default ProjectRoutes;
