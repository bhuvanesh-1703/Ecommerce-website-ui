import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem('userId');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser);
        } catch (err) {
          // If storedUser is just a string, fallback
          setUserName({ username: storedUser });
        }
      }
    };

    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserName(null);
    navigate('/login'); 
  };

  if (!userName) {
    return <p>Please Login</p>;
  }

  return (
    <div>
      <h2>Hello, {userName.username}</h2>

      <h1 onClick={() => navigate("/orders")}>Orders</h1>
      <h1 onClick={() => navigate("/recentview")}>Recent View</h1>
      <h1 onClick={handleLogout}>Log Out</h1>
    </div>
  );
};

export default UserDashboard;
