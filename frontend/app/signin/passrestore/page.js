'use client';

import React from 'react';
import Footer from "../../../components/hedfot/FooterHome.js";
import Header from "../../../components/hedfot/HeaderHome.js";
import OtpSender from "../../../components/forgetpassword/OTPSender.js";
import "../../../styles/Navigation.css";
//import "../../../styles/OTPSender.css";

export default function PassRestore() {
    return (
        <div className="otpMain">
            <header>
                <Header />
            </header>
            
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
