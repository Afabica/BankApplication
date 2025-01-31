//"use client";
//
//import React, { useState, useEffect} from "react";
//import SidePanel from '../../../components/dashcomp/MainPage/SidePanel.js';
//import Header from '../../../components/hedfot/DashHeader.js';
//import Footer from '../../../components/hedfot/DashFooter.js';
//import PanelElements from '../../../components/hedfot/PanelElements.js';
//import '../../../styles/NavDash.css';
//import ThemeChanger from '../../tools/ThemeChanger.js';
//
//const SecuritySettings = () => {
//  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
//  const [biometricEnabled, setBiometricEnabled] = useState(true);
//  const [currentTheme, setCurrentTheme] = useState(false);
//  const [password, setPassword] = useState("");
//  const [notifications, setNotifications] = useState(false);
//  const [passwordStrength, setPasswordStrength] = useState(0);
//  const [isPanelOpen, setIsPanelOpen] = useState(false);
//
//    
//  const toggleNotifications = () => {
//    setNotifications((prev) => !prev);
//  }
//
//  const togglePanel = () => {
//        setIsPanelOpen((prev) => !prev);
//    }
//
//
//
//
//  // Handle form submission
//  const handleChangePassword = (e) => {
//    e.preventDefault();
//    // Logic for changing password here
//    console.log("Password changed!");
//  };
//  
//  return (
//    <div className="container">
//      <Header/>
//      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPnaleOpen(false)}> 
//        <PanelElements/>
//        </SidePanel>
//      <div className="SettingsCont">
//      <h1>Security Settings</h1>
//      <div className="security-settings-container">
//      <p>Theme changin.<p> 
//      <ThemeChanger/>
//
//      <button onClick={toggleTheme} style={{padding: '10px', cursor: 'pointer'}}>
//      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
//      </button>
//
//      <div className='ThirdPartySettings'>
//        <div>
//        <label>Notifications</label> 
//        <button onClick={toggleNotifications} style={{padding: '10px', cursor: 'pointer'}}/>
//        <label>Language</label> 
//        <select value={language} onChange={(e)=> setLanguage(e.target.value)}> 
//        <option value="en">English</option>
//        <option value="es">Spanish</option>
//        <option value="fr">French</option> 
//        </select> 
//        </div> 
//        <div> 
//        <label>Balance Threshold for Notifications</label>
//        <input type="number" 
//        value={balanceThreshold}
//        onChange={(e) => setBalanceThreshold(e.target.value)}
//        />
//        </div> 
//      </div>
//
//        {/* Two Factor Authentication */}
//
//        {/* Biometric Authentication */}
//
//        {/* Change Password Form */}
//        <div className="change-password">
//          <h3>Change Password</h3>
//          <form onSubmit={handleChangePassword}>
//            <button type="submit">Change Password</button>
//          </form>
//        </div>
//
//        {/* Active Sessions */}
//      </div>
//        </div>
//    </div>
//  );
//};
//
//export default SecuritySettings;
//
