import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="FooterCont">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-sections">
                        {/* About Section */}
                        <div className="footer-section">
                            <h4 className="footer-heading">About</h4>
                            <ul className="footer-links">
                                <li>
                                    <Link href="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/careers">Careers</Link>
                                </li>
                                <li>
                                    <Link href="/blog">Blog</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support Section */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Support</h4>
                            <ul className="footer-links">
                                <li>
                                    <Link href="/contact">Contact Us</Link>
                                </li>
                                <li>
                                    <Link href="/faq">FAQs</Link>
                                </li>
                                <li>
                                    <Link href="/help-center">Help Center</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal Section */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Legal</h4>
                            <ul className="footer-links">
                                <li>
                                    <Link href="/terms">Terms of Service</Link>
                                </li>
                                <li>
                                    <Link href="/privacy">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="/security">Security</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p className="footer-text">© 2024 BankApp, All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

