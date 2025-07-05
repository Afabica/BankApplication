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
    <footer className="justify-center items-center bg-gray-900 text-white py-10">
      <div className=" justify-center container mx-auto px-4">
        <div className="justify-center grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Navigation Links */}
          <nav
            className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6"
            aria-label="Footer navigation"
          >
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
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

          {/* Social / Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
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

        {/* Bottom copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>© {currentYear} BankApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
