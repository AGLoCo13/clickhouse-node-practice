import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {PublicRoutes , PrivateRoutes} from './routes';
import {AuthProvider} from './context/AuthContext';

const renderRoutes = (routes) => 
  routes.map(({ path, element, children }, i) => (
    <Route key={i} path={path} element={element}>
      {children &&
        children.map((child, j) => (
          <Route key={j} path={child.path || ''} element={child.element}>
            {child.children &&
              child.children.map((nested, k) => (
                <Route key={k} path={nested.path || ''} element={nested.element} />
              ))}
          </Route>
        ))}
    </Route>
  ));


const App = () => (
  <AuthProvider>
  <Router>
    <Routes>
      {renderRoutes(PublicRoutes)}
      {renderRoutes(PrivateRoutes)}
    </Routes>
  </Router>
  </AuthProvider>
);

export default App;

