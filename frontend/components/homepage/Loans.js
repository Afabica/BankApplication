import React, { useState } from 'react';
import styles from '../../styles/LoanPage.module.css';

const LoanPage = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const loanTypes = [
    { id: 1, name: 'Personal Loan', description: 'Flexible loans for personal expenses with competitive rates.' },
    { id: 2, name: 'Home Loan', description: 'Mortgage solutions with low rates to help you buy your dream home.' },
    { id: 3, name: 'Car Loan', description: 'Affordable financing options to purchase a new or used car.' },
  ];

  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const months = parseFloat(term) * 12;
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment =
      (principal * rate) / (1 - Math.pow(1 + rate, -months));
    setMonthlyPayment(payment.toFixed(2));
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1>Get Your Dream Loan Today</h1>
        <p className={styles.tagline}>Affordable rates, easy application process!</p>
        <button className={styles.applyNowBtn}>Apply Now</button>
      </header>

      {/* Loan Types Section */}
      <section className={styles.loanTypes}>
        <h2>Our Loan Offerings</h2>
        <div className={styles.loanList}>
          {loanTypes.map((loan) => (
            <div className={styles.loanCard} key={loan.id}>
              <h3>{loan.name}</h3>
              <p>{loan.description}</p>
              <button className={styles.learnMoreBtn}>Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section className={styles.loanCalculator}>
        <h2>Loan Calculator</h2>
        <div className={styles.calculatorForm}>
          <label>
            Loan Amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </label>
          <label>
            Term (Years)
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Enter term in years"
            />
          </label>
          <label>
            Interest Rate (%) per year
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </label>
          <button className={styles.calculateBtn} onClick={calculateLoan}>
            Calculate
          </button>
        </div>

        {monthlyPayment && (
          <div className={styles.result}>
            <h3>Estimated Monthly Payment</h3>
            <p>${monthlyPayment}</p>
          </div>
        )}
      </section>

      {/* Apply Now Section */}
      <section className={styles.applySection}>
        <h2>Ready to Apply?</h2>
        <p>Apply for your loan today with our fast and easy online process!</p>
        <button className={styles.applyNowBtn}>Apply Now</button>
      </section>
    </div>
  );
};

export default LoanPage;

