import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sidebar />
    <ChatWindow />
  </StrictMode>
);
