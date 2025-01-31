import React from "react";

const AccountsAndPaymentsPage = () => {
  return (
    <div className="accounts-payments-page">
      <header className="page-header">
        <h1 className="page-title">Accounts & Payments</h1>
        <p className="page-subtitle">
          Simplify your banking with our account and payment solutions.
        </p>
      </header>

      <main className="services-container">
        {/* Accounts Section */}
        <section className="service-section">
          <h2>Accounts</h2>
          <p>
            Manage your money effortlessly with our range of bank accounts. Whether you need a checking account for daily expenses or a savings account for future goals, we have the right solution for you.
          </p>
          <ul>
            <li>Free online banking</li>
            <li>No monthly fees for basic accounts</li>
            <li>Overdraft protection</li>
            <li>Secure debit cards with contactless payments</li>
          </ul>
          <button className="learn-more-button">Learn More</button>
        </section>

        {/* Payments Section */}
        <section className="service-section">
          <h2>Payments</h2>
          <p>
            Make secure and seamless payments anywhere, anytime. Our advanced payment solutions are fast, reliable, and easy to use.
          </p>
          <ul>
            <li>Instant money transfers</li>
            <li>Schedule recurring bill payments</li>
            <li>International remittances</li>
            <li>QR code-based payments for convenience</li>
          </ul>
          <button className="learn-more-button">Learn More</button>
        </section>
      </main>

      <footer className="page-footer">
        <p>&copy; {new Date().getFullYear()} Your Bank. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .accounts-payments-page {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 20px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .page-title {
          font-size: 2.5rem;
          color: #0070f3;
          margin-bottom: 10px;
        }

        .page-subtitle {
          font-size: 1.2rem;
          color: #666;
        }

        .services-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .service-section {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .service-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .service-section h2 {
          font-size: 1.8rem;
          color: #0070f3;
          margin-bottom: 15px;
        }

        .service-section p {
          color: #555;
          margin-bottom: 20px;
        }

        .service-section ul {
          list-style: disc;
          margin-left: 20px;
          margin-bottom: 20px;
        }

        .learn-more-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .learn-more-button:hover {
          background-color: #005bb5;
        }

        .page-footer {
          text-align: center;
          margin-top: 40px;
          font-size: 0.9rem;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default AccountsAndPaymentsPage;

