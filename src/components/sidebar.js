// src/components/Sidebar.jsx
import React from 'react';
import './sidebar.css'; // Import the CSS file for styling
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        
        <a href="/propertylist" className="sidebar-item">PropertyList</a>
        <a href="/addproperty" className="sidebar-item">Add Property</a>
        <a href="/inquiry" className="sidebar-item">Enquiry</a>
        <a className='Logout'><LogoutButton/></a>
        
      </div>
    </div>
  );
};

export default Sidebar;
