// components/FAQSection.js
import React from 'react';

const FAQSection = () => {
  const faqData = [
    { question: 'How do I open an account?', answer: 'You can open an account online by providing basic information and documents.' },
    { question: 'Is there a minimum deposit?', answer: 'No, we do not require a minimum deposit to open a standard account.' },
    { question: 'Can I apply for a loan online?', answer: 'Yes, you can apply for personal loans directly through our online portal.' },
  ];

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .faq-section {
          padding: 50px 20px;
          background-color: #f9f9f9;
        }
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-item {
          margin-bottom: 20px;
        }
        .faq-item h3 {
          font-size: 1.25rem;
          font-weight: bold;
        }
        .faq-item p {
          font-size: 1rem;
          color: #666;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;

