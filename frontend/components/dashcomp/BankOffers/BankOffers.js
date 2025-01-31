"use client";

import { useEffect, useState } from "react";
import ScrollTriggerComponent from '../../animation/ScrollTriggerComponent.js';
import { gsap } from 'gsap';

const BankOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch offers (replace with your API endpoint)
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/offers");
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching bank offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <p>Loading offers...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bank Offers for You</h1>
      {offers.length > 0 ? (
        <div style={styles.offersList}>
          {offers.map((offer) => (
            <div key={offer.id} style={styles.offerCard}>
              <h2 style={styles.offerTitle}>{offer.title}</h2>
              <p style={styles.offerDescription}>{offer.description}</p>
              <p style={styles.expiry}>Expires on: {offer.expiryDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No offers available at the moment. Please check back later.</p>
      )}
    </div>
  );
};

export default BankOffers;

// Inline styles for simplicity
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  offersList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  offerCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  offerTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  offerDescription: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  expiry: {
    fontSize: "0.9rem",
    color: "#888",
  },
};

