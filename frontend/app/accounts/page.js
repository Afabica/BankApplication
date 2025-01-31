"use client";

import React from 'react';
import Footer from '../../components/hedfot/FooterHome.js';
import Header from '../../components/hedfot/HeaderHome.js';
import AccountsAndPaymentsPage from '../../components/homepage/AccountsAndPaymentsPage.js';
//import '../../styles/Navigation.css';
import '../../styles/NavDash.css';

export default function Accounts() {


    return (
        <div className="AccountCont">
        <Header/>
        <AccountsAndPaymentsPage/>
        <Footer/>
        </div>
    )
}
