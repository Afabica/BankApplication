"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../logincomp/Logout.js";

const Header = ({ togglePanel, isPanelOpen }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Toggle SidePanel Button */}
        <button
          onClick={togglePanel}
          className="text-2xl text-gray-800 dark:text-white mr-5"
          aria-label="Toggle Side Panel"
        >
          <FontAwesomeIcon icon={isPanelOpen ? faTimes : faBars} />
        </button>

        {/* Logo */}
        <div className="text-lg font-semibold text-gray-800 dark:text-white">
          BankApp
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex w-full justify-between items-center ml-10">
          <ul className="flex space-x-6 text-sm font-medium text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href="/user/dashboard/profile"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/user/dashboard/support"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Help/Support
              </Link>
            </li>
          </ul>
          <ul className="flex space-x-4 text-sm font-medium text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href="/user/dashboard/notifications"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Notifications
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
      </div>

      {/* Mobile Navigation Menu */}
    </header>
  );
};

export default Header;
