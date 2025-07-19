"use client";

import React from "react";
import Header from "../../../../components/hedfot/HeaderHome";
import Footer from "../../../../components/hedfot/FooterHome";
import OTPGetter from "../../../../components/forgetpassword/OTPGetter.js";

const HomePass = () => {
  return (
    <div>
      <Header />
      <OTPGetter />
      <Footer />
    </div>
  );
};

export default HomePass;
