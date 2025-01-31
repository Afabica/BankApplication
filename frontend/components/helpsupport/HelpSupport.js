import React from 'react';
import '../../styles/HelpSupport.css';
import Header from '../hedfot/DashHeader.js';

const HelpSupport = () => {
  return (
    <div className="help-support-page">
      <Header/>
      <header className="header">
        <h1>Help & Support</h1>
        <p>We’re here to assist you with any questions or issues you may have.</p>
      </header>

      <section className="faqs">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How do I reset my password?</h3>
          <p>
            To reset your password, go to the login page and click on "Forgot Password." Follow the instructions to set a new password.
          </p>
        </div>
        <div className="faq-item">
          <h3>How can I contact customer support?</h3>
          <p>
            You can reach our customer support team by clicking on the "Contact Us" section below or by calling our hotline at <strong>1-800-555-1234</strong>.
          </p>
        </div>
        <div className="faq-item">
          <h3>How do I check my account balance?</h3>
          <p>
            Log in to your account, and you’ll see your balance displayed on the dashboard. You can also check it via our mobile app.
          </p>
        </div>
      </section>

      <section className="contact-us">
        <h2>Contact Us</h2>
        <p>If you need further assistance, feel free to get in touch with us:</p>
        <ul>
          <li>Email: <a href="mailto:support@yourbank.com">support@yourbank.com</a></li>
          <li>Phone: <strong>1-800-555-1234</strong></li>
          <li>Live Chat: Available 24/7 in our mobile app.</li>
        </ul>
      </section>

      <section className="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>
          If you encounter issues, try the following steps:
        </p>
        <ol>
          <li>Ensure you have a stable internet connection.</li>
          <li>Clear your browser cache and cookies.</li>
          <li>Update your browser or mobile app to the latest version.</li>
        </ol>
      </section>

      <section className="feedback">
        <h2>Feedback</h2>
        <p>
          Your feedback is important to us. Please let us know how we can improve by filling out our feedback form.
        </p>
        <a href="/feedback" className="feedback-button">Submit Feedback</a>
      </section>


      <style jsx>{`
        .help-support-page {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .faqs, .contact-us, .troubleshooting, .feedback {
          margin-bottom: 40px;
        }
        h2 {
          border-bottom: 2px solid #ddd;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .faq-item {
          margin-bottom: 20px;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        ul li {
          margin-bottom: 10px;
        }
        .feedback-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0070f3;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
        .feedback-button:hover {
          background-color: #005bb5;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          font-size: 14px;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default HelpSupport;

