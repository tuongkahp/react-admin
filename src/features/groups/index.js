import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GroupPage from './pages/GroupPage';

const Groups = () => {
  return (
    <Routes>
      <Route exact path="/" element={<GroupPage />} />
    </Routes>
  );
};

export default Groups;