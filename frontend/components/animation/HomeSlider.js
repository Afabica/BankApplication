import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../styles/HomeSlider.module.css";

const HomeSlider = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      image: "/images/SecureBank.jpeg",
      alt: "Welcome to Bank XYZ - Secure Banking",
      text: "Welcome to Bank XYZ - Secure Banking",
      link: "/secure-banking",
    },
    {
      id: 2,
      image: "/images/loan.jpg",
      alt: "Personalized Solutions for Your Financial Goals",
      text: "Personalized Solutions for Your Financial Goals",
      link: "/financial-goals",
    },
    {
      id: 3,
      image: "/images/loans.jpg",
      alt: "Achieve Your Dreams with Our Loan Offers",
      text: "Achieve Your Dreams with Our Loan Offers",
      link: "/loan-offers",
    },
  ];

  if (!mounted) return null; // Ensures the component renders only after mounting

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={styles.slide}
            onClick={() => router.push(slide.link)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className={styles.slideImage}
            />
            <div className={styles.textOverlay}>{slide.text}</div>
            <div className="" onClick={() => router.push(slide.link)}>
              Learn More
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
