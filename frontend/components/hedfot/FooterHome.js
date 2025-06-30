import Link from "next/link";
import React from "react";

const footerSections = [
  {
    title: "About",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQs" },
      { href: "/help-center", label: "Help Center" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/security", label: "Security" },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="FooterCont bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-8">
          <nav
            className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4"
            aria-label="Footer navigation"
          >
            {footerSections.map((section) => (
              <div key={section.title} className="footer-section">
                <h4 className="footer-heading text-lg font-semibold mb-4">
                  {section.title}
                </h4>
                <ul className="footer-links space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:underline text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Optional: Social Links or App Info */}
          <div className="footer-brand">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Replace with real icons */}
              <a href="#" aria-label="Facebook" className="hover:text-blue-400">
                Fb
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-300">
                Tw
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-200">
                Ln
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>© {currentYear} BankApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
