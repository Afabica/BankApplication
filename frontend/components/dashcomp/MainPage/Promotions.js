// components/Promotions.js
import React from 'react';

// Function to calculate time remaining
function timeRemaining(expiryDate) {
  const now = new Date();
  const endTime = new Date(expiryDate);
  const timeDiff = endTime - now;

  if (timeDiff <= 0) return 'Expired';

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m remaining`;
}

const Promotions = ({ promotions }) => {
  if (promotions.length === 0) {
    return <p>No promotions available at the moment.</p>;
  }

  return (
    <div className="promotions">
      <h2>Special Promotions</h2>

      {promotions.map((promotion, index) => (
        <div key={index} className="promotion-item">
          <img src={promotion.image} alt="Promotion Image" className="promo-image" />
          <p className="promo-description">{promotion.description}</p>
          <span className="promo-timer">{timeRemaining(promotion.expiry)}</span>
          <a href={promotion.link} className="cta-button" target="_blank" rel="noopener noreferrer">
            Claim Offer
          </a>
        </div>
      ))}
    </div>
  );
};

export default Promotions;

