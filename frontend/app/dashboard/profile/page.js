'use client';

import Link from 'next/link';
import React from 'react';
//import './home.css';
import ProfilePage  from '../../../components/profile/ProfilePage.js';
import '../../../styles/Profile.css';
import '../../../styles/NavDash.css';
//import '../../../styles/DashPage.css';


const HomePage = () => {
  return (
    <div>
      
      <ProfilePage/>
      {/* Footer Section */}
    </div>
  );
};

export default HomePage;
