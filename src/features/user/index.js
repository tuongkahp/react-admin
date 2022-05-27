import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';

const User = () => {
  return (
    <Routes>
      <Route exact path="/" element={<UserList />} />
    </Routes>
  );
};

export default User;