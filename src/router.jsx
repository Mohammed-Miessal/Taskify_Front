import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../src/Views/Home';
import Login from '../src/Views/Login';
import Register from '../src/Views/Register';
import Create from '../src/components/Create';
import Edit from '../src/components/Edit';

const isAuthenticated = () => {
    // Check if there is a user authentication token stored in local storage
    const authToken = localStorage.getItem('authToken');
    
    // Return true if the authToken is present and not expired, otherwise return false
    return !!authToken; // Double negation to convert null/undefined to false and non-empty string to true
};

const ProtectedRoute = ({ element: Element, ...rest }) => (
  <Route
    {...rest}
    element={isAuthenticated() ? <Element /> : <Navigate to="/login" />}
  />
);

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Use ProtectedRoute for routes that require authentication */}
      <ProtectedRoute path="/create" element={<Create />} />
      <ProtectedRoute path="/edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default AppRouter;