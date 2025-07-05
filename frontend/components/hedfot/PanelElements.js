"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LogoutButton from "../logincomp/Logout"; // adjust path if needed
import "../../styles/Navigation.css";

const PanelElements = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint = 768px
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <aside className="sidebar p-4">
      <nav className="sidebar-nav flex flex-col space-y-3 text-gray-800 dark:text-gray-200">
        <Link href="/user/dashboard" className="hover:text-blue-600">
          Account Statics
        </Link>
        <Link href="/user/dashboard/payments" className="hover:text-blue-600">
          Payments
        </Link>
        <Link
          href="/user/dashboard/transactions"
          className="hover:text-blue-600"
        >
          Transactions
        </Link>
        <Link href="/user/dashboard/accmanag" className="hover:text-blue-600">
          Accounts
        </Link>
        <Link href="/user/dashboard/statistic" className="hover:text-blue-600">
          Statistics and Reports
        </Link>
        <Link href="/user/dashboard/funds" className="hover:text-blue-600">
          Budget
        </Link>
        <Link href="/user/dashboard/investment" className="hover:text-blue-600">
          Investments
        </Link>
        <Link href="/user/dashboard/loans" className="hover:text-blue-600">
          Loans
        </Link>
        <Link href="/user/dashboard/rewards" className="hover:text-blue-600">
          Rewards
        </Link>
        <Link href="/user/dashboard/settings" className="hover:text-blue-600">
          Security Settings
        </Link>

        {/* Render additional links only on mobile */}
        {isMobile && (
          <>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
            <Link
              href="/user/dashboard/profile"
              className="hover:text-blue-600"
            >
              Profile
            </Link>
            <Link
              href="/user/dashboard/support"
              className="hover:text-blue-600"
            >
              Help/Support
            </Link>
            <Link
              href="/user/dashboard/notifications"
              className="hover:text-blue-600"
            >
              Notifications
            </Link>
            <div>
              <LogoutButton />
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};

export default PanelElements;
