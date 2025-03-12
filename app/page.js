import React from "react";
import HomePage from "../components/homepage/HomePage";
import Header from "../components/hedfot/Header";

export default function Home() {
  return (
    <div className="max-h-screen max-w-screen">
      <Header/>
      <HomePage />
    </div>
  );
}
