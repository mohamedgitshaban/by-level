
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import { logout } from '../Api';
import Navbar from './Navbar';



const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        // Make an authenticated API request to get user data
        // const response = await getUserData();
        // setUser(response.data);
        const token = localStorage.getItem('AgriCapital_token');
        // console.log(token);
        if (!token) {
          // Redirect to login page if not authenticated
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);
  return (
  <div className="wrapper">
      <Navbar />
     
        {/* <SideBarStiky /> */}
        {/* <SidBar /> */}
        <Outlet/>

      </div>


  );
};

export default Dashboard;