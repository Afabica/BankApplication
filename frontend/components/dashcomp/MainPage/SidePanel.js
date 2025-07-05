"use client";

import React from "react";

const SidePanel = ({ children, isOpen, onClose }) => {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 overflow-hidden h-full">{children}</div>
      </aside>
    </>
  );
};

export default SidePanel;
