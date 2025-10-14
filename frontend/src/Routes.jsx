import { useRoutes } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import Signup from './auth/Signup.jsx';
import Login from './auth/Login.jsx';

const ProjectRoutes = () => {
  let element = useRoutes([
    {
      path: '/',
      element: (
        <div style={{backgroundColor: 'black'}} className="black">
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
