import './App.css';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import Login from '../src/auth/Login.jsx';
import Signup from '../src/auth/Signup.jsx';

const App = () => {
  return (
    <div>
      <Signup />
      <Login />
    </div>
    // <div className="d-flex">
    //   <div className="app-sidebar">
    //     <Sidebar />
    //   </div>
    //   <div className="app-chatwindow">
    //     <ChatWindow />
    //   </div>
    // </div>
  );
};

export default App;
