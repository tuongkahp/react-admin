import React from 'react';
const { useLocation, Navigate } = require("react-router-dom");

const RequireAuth = ({ children }) => {
  let auth = {
    user: {
      username: 'Timble Tran'
    }
  };
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;