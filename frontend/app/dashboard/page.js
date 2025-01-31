'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; 
import FooterHome from '../../components/hedfot/FooterHome';
import HeaderHome from '../../components/hedfot/HeaderHome';
import Home from '../../components/dashcomp/MainPage/ProfPage';
//import styles from '../../styles/HomeSlider.css';
//import '../../styles/global.css'
import '../../styles/NavDash.css';
import '../../styles/DashPage.css';

const ProfilePage = () => {
    return (
        <div>
            <Home />
        </div>
    );
};

export default ProfilePage;

