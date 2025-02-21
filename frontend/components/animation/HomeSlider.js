import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/HomeSlider.css';

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    {
      id: 1,
      image: '/images/SecureBank.jpeg',
      alt: 'Welcome to Bank XYZ - Secure Banking',
    },
    {
      id: 2,
      image: '/images/loan.jpg',
      alt: 'Personalized Solutions for Your Financial Goals',
    },
    {
      id: 3,
      image: '/images/loans.jpg',
      alt: 'Achieve Your Dreams with Our Loan Offers',
    },
  ];

  return (
    <div className={styles.sliderContainer}>
      <Slider  {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <img
              src={slide.image}
              alt={slide.alt}
            />
          <div className="caption">
            <a href="/info">Click here</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;

