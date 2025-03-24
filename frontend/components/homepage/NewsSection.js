"use client";

import Link from "next/link";
import React from "react";

export const AdvertisementSection = () => {
  return (
    <section className="advertisement-section">
      <div className="advertisement-banner">
        <h2>Special Offers Just for You!</h2>
        <p>
          Earn up to 5% cashback on purchases with our premium credit cards.
        </p>
        <Link href="/offers">
          <button className="advertisement-button">Explore Offers</button>
        </Link>
      </div>
    </section>
  );
};

export const NewsSection = () => {
  const articles = [
    {
      id: 1,
      title: "5 Tips to Manage Your Finances Better",
      link: "/blogs/finance-tips",
    },
    {
      id: 2,
      title: "Why Online Banking Is the Future",
      link: "/blogs/online-banking",
    },
    {
      id: 3,
      title: "How to Save for Your First Home",
      link: "/blogs/saving-tips",
    },
  ];

  return (
    <section className="news-section">
      <h2 className="section-title">Latest News & Blogs</h2>
      <div className="news-container">
        {articles.map((article) => (
          <div key={article.id} className="news-item">
            <h3 className="news-title">{article.title}</h3>
            <Link href={article.link}>
              <button className="read-more-button">Read More</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "BankApp made managing my finances so much easier and stress-free!",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback:
        "Secure and reliable services. I trust BankApp with my investments.",
    },
    {
      id: 3,
      name: "David Johnson",
      feedback: "The customer support is excellent! Highly recommend BankApp.",
    },
  ];

  return (
    <section className="testimonials-section">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-item">
            <p className="testimonial-feedback">"{testimonial.feedback}"</p>
            <p className="testimonial-name">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const CallToActionSection = () => {
  return (
    <section className="cta-section">
      <h2>Ready to Take Control of Your Finances?</h2>
      <p>
        Join thousands of satisfied customers using BankApp for secure and
        efficient banking.
      </p>
      <Link href="/register">
        <button className="cta-button">Get Started Now</button>
      </Link>
    </section>
  );
};
