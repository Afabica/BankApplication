import React from "react";
import "../src/styles/global.css";

export const metadata = {
  title: "Nxet js",
  description: "Fenerated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
