import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BasicProvider } from '../src/Context/BasicContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectRoutes from './Routes.jsx';
import { AuthProvider } from '../src/Context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <BasicProvider>
          <ProjectRoutes />
        </BasicProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
