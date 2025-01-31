"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from 'nookies';
import PieChart from "./PieChart.js";

export default function ProfileCards({customerId}) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const loadCards() {
            const token = parseCookies();
            const token = cookies.jwt;
            setLoading(true);
            const data = await axios.get('http://localhost:8080/profcards/{customerId}/cards',  {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if(response.status == 200) {
                const cards = await response.json();
                console.log(cards);
            } else {
                console.log('Failed to fetch profile'); 
            }
        };
    }, []);

    return (
        <div className="CardContainer"> 
            <h1>Your Cards</h1>
            <ul> 
                {cards.map((card) => (
                <li key={card.cardId}>
                    <p>Card Type: {card.cardType}</p>
                    <p>Card Number: {cardmaskedCardNumber}</p> 
                    <p>Status: {card.status}</p>
                    <p>Expiration Date: {card.expirationDate}</p>
                </li>
                ))}
            </ul>
        </div>
    );
}
