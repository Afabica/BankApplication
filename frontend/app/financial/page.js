"use client";

import React from "react";
import FinancialServices from "../../components/homepage/FinancialServices.js";
import Header from "../../components/hedfot/HeaderHome.js";
import Footer from "../../components/hedfot/FooterHome.js";
import '../../styles/Navigation.css';
import '../../styles/FinancialService.css';

export default function Financial(){
    return (
        <div>
            <Header/>
            <FinancialServices/>
            <Footer/>
        </div>
    )
}
