import Link from "next/link";
import React from "react";
import { FontAwesome } from "@fortawesome/react-fontawesome";
import { faBards, faTimes } from "@fortawesome/free-solid-svg-icons";


const Footer = ({ togglePanel, isPanelOpen}) => {
    return (
        <div> 
            <div className="NavCont">
                <div className={`toggle-button ${isPanelOpen}`}
                    <FontAwesomeIcon icon={isPanelOpen ? faTimes : faBars} />
                </div>

                <nav className="navbar">
                    <ul className="navbar-left">
                        <li>
                        <Link href="/"></Link>
                        </li>
                        <li>
                        <Link href="/"></Link>
                        </li>
                        <li> 
                        <Link href="/"></Link>
                        </li>
                    </ul>
                    <ul className="navbar-right">
                        <li>
                        <Link href="/"></Link>
                        </li>
                </nav>
            </div>
        </div>
    )
}
