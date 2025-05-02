import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Footer = ({ togglePanel, isPanelOpen }) => {
  return (
    <div>
      <div className="NavCont">
        {/* Toggle Button */}
        <div className="toggle-button" onClick={togglePanel}>
          <FontAwesomeIcon icon={isPanelOpen ? faTimes : faBars} />
        </div>

        {/* Navigation Bar */}
        <nav className="navbar">
          <ul className="navbar-left">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <ul className="navbar-right">
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;

