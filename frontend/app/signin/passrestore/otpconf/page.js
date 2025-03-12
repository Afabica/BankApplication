"use client";

import React from "react";
import Header from "../../../../components/hedfot/HeaderHome";
import Footer from "../../../../components/hedfot/FooterHome";
import ThemeSwitcher from "../../../../scripts/theme.js";
import OTPGetter from "../../../../components/forgetpassword/OTPGetter.js";

const HomePass = () => {
  return (
    <div>
      <Header />
      <ThemeSwitcher />
      <OTPGetter />
      <Footer />
    </div>
  );
};

export default HomePass;
