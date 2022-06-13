import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';

const User = () => {
  return (
    <Routes>
      <Route exact path="/" element={<UserPage />} />
    </Routes>
  );
};

export default User;