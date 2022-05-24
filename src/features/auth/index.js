import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import { Routes } from 'react-router-dom';
// import AddEditPage from './pages/AddEdit';
// import MainPage from './pages/Main';

Auth.propTypes = {};

function Auth(props) {
  // const match = useRouteMatch();
  // console.log({ match });

  return (
    <Routes>
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
      {/* <Route exact path={`${match.url}/login`} element={<Login />} /> */}
      {/* <Route exact path={`${match.url}/register`} component={Register} /> */}

      {/* <Route path={`${match.url}/add`} component={AddEditPage} />
      <Route path={`${match.url}/:photoId`} component={AddEditPage} /> */}

      <Route component={NotFound} />
    </Routes>
  );
}

export default Auth;