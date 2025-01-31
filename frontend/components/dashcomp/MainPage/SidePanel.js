import React from "react";
import styles from "../../../styles/SidePanel.module.css";

const SidePanel = ({ children, isOpen, onClose }) => {
  return (
    <div className={`${styles.sidePanel} ${isOpen ? styles.open : ""}`}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.panelContent}>
        {/* Conditionally Render Close Button */}
        {!isOpen && (
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default SidePanel;

