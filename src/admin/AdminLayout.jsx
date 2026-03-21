import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './AdminLayout.css';
import './Header.css';
import './Sidebar.css';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main">
        <Header />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
