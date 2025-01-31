'use client';

import Link from 'next/link';
import React from 'react';
import HelpSupport from '../../../components/helpsupport/HelpSupport.js';
//import './home.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <HelpSupport/>
    </div>
  );
};

export default HomePage;
