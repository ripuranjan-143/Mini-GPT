import './App.css';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';

const App = () => {
  return (
    <div className="d-flex">
      <div className="app-sidebar">
        <Sidebar />
      </div>
      <div className="app-chatwindow">
        <ChatWindow />
      </div>
    </div>
  );
};

export default App;
