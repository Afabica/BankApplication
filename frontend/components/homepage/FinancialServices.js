import React from "react";

const FinancialServices = () => {
  return (
    <div className="financial-services">
      <div className="container">
        <h1 className="section-title">Secure Your Future with Our Financial Services</h1>
        <p className="section-subtitle">
          Explore our tailored solutions for savings, investments, and pensions to grow and protect your wealth.
        </p>

        <div className="services-grid">
          {/* Savings */}
          <div className="service-card">
            <h2 className="service-title">Savings</h2>
            <p className="service-description">
              Build your financial security with our high-interest savings accounts. Whether you're saving for a 
              rainy day or a big goal, we've got you covered.
            </p>
            <ul className="service-features">
              <li>Competitive interest rates</li>
              <li>No hidden fees</li>
              <li>Flexible withdrawal options</li>
            </ul>
            <button className="learn-more-button">Learn More</button>
          </div>

          {/* Investment */}
          <div className="service-card">
            <h2 className="service-title">Investments</h2>
            <p className="service-description">
              Grow your wealth with our diversified investment options. From mutual funds to stocks, 
              we'll help you make your money work harder.
            </p>
            <ul className="service-features">
              <li>Expert portfolio management</li>
              <li>Risk-adjusted strategies</li>
              <li>Real-time monitoring</li>
            </ul>
            <button className="learn-more-button">Learn More</button>
          </div>

          {/* Pension */}
          <div className="service-card">
            <h2 className="service-title">Pension Plans</h2>
            <p className="service-description">
              Plan for a worry-free retirement with our customized pension plans. Start early and secure a 
              steady income for the future.
            </p>
            <ul className="service-features">
              <li>Tax benefits</li>
              <li>Flexible contribution options</li>
              <li>Guaranteed income after retirement</li>
            </ul>
            <button className="learn-more-button">Learn More</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FinancialServices;

