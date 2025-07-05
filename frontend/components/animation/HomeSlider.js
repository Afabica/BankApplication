"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  const slides = [
    {
      id: 1,
      image: "/images/SecureBank.jpeg",
      alt: "Secure Banking",
      text: "Welcome to Bank XYZ - Secure Banking",
      link: "/secure-banking",
    },
    {
      id: 2,
      image: "/images/loan.jpg",
      alt: "Financial Goals",
      text: "Personalized Solutions for Your Financial Goals",
      link: "/financial-goals",
    },
    {
      id: 3,
      image: "/images/loans.jpg",
      alt: "Loan Offers",
      text: "Achieve Your Dreams with Our Loan Offers",
      link: "/loan-offers",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            onClick={() => router.push(slide.link)}
            className="relative cursor-pointer group"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg text-sm sm:text-lg">
              {slide.text}
            </div>
            <div className="absolute bottom-6 right-6 text-sm sm:text-base text-white underline hover:text-blue-300">
              Learn More →
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
