import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css'
import routes from './routes';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/bitcoin-price" />} />
      <Route path="/dashboard/:view" element={<Dashboard />} /> 
      {routes.map(d => {
        return ( 
          <LayoutComponent>
        <Route path={d.path} element={d.element} />
        </LayoutComponent>
      )
      })}
    </Routes>
  </Router>
);

export default App;

