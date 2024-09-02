import React from 'react';
import logout from './Logout';

const LogoutButton = () => {
  return (
    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
