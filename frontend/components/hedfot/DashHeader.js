import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from '../logincomp/Logout.js';

const Header = ({ togglePanel, isPanelOpen }) => {
  return (
    <div>
      <div className="NavCont">
        {/* Toggle Button */}
        <div className={`toggle-button ${isPanelOpen ? "open" : ""}`} onClick={togglePanel}>
          <FontAwesomeIcon icon={isPanelOpen ? faTimes : faBars} />
        </div>

        {/* Navigation */}
        <nav className="navbar">
          <ul className="navbar-left">
            <li>
              <Link href="/dashboard/profile">Profile</Link>
            </li>
            <li>
              <Link href="/dashboard/support">Help/Support</Link>
            </li>
          </ul>
          <ul className="navbar-right">
            <li>
              <LogoutButton/>
            </li>
            <li>
              <Link href="/dashboard/notifications">Notifications</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;

