'use client';

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import AuthWith from '../tools/withAuth.js';
import Header from '../hedfot/DashHeader';
import Footer from '../hedfot/DashFooter.js';
import { parseCookies } from 'nookies';
import PanelElements from '../../components/hedfot/PanelElements.js';
import withAuth from "../tools/withAuth.js";
import SidePanel from '../dashcomp/MainPage/SidePanel.js';
import '../../styles/NavDash.css';
import '../../styles/DashPage.css';
import '../../styles/Navigation.css';


const RecentTransaction = () => {

    const [transaction, setTransaction] = useState(['']);
    const [isPanelOpen, setPanelIsOpen] = useState('');
    const [error, setError] = useState('');



    useEffect(() => {
        const fetchTransaction = async () => {
            const cookies = parseCookies();
            const token = cookies.jwt;
            const response = await axios.get('http://localhost:8080/api', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if(response.status == 200) {
                setTransaction(response.json());
            } else {
                console.lof('Failed to fetch profile');
            }
        };
    }, []);


    return (
        <div className="Transaction">
            <Header/>
            <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
            <PanelElements/>
            </SidePanel>
        </div>
    )
}

export default RecentTransaction;
