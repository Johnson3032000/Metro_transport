import React from "react";
import { FaInstagram, FaTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import './Footer.css'
import nav_img from "../assets/cumta_logo.png"

const quickLinks = [
  { label: "Cumta", href: "#" },
  { label: "Home", href: "#" },
  { label: "Maps", href: "#" },
  { label: "Datasets", href: "#" },
];

const stakeholders = [
  { label: "Chennai Metro Rail (CMRL)", href: "#" },
  { label: "Southern railways (SR)", href: "#" },
  { label: "Metropolitan Transport Corporation (MTC)", href: "#" },
];

const socials = [
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
  { icon: <FaTwitter />, href: "#", label: "Twitter" },
  { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
  { icon: <FaFacebookF />, href: "#", label: "Facebook" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Column 1 – About */}
        <div className="footer__col">
          <div className="footer__brand">
            <img src={nav_img} alt="CUMTA logo" className="footer__logo" />
            <span className="footer__brand-name">CUMTA</span>
          </div>

          <p className="footer__about">
            Chennai Unified Metropolitan Transport Authority (CUMTA) is the
            nodal agency for coordinating and monitoring the implementation of
            various transport projects in the Chennai Metropolitan Area.
          </p>

          <div className="footer__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 – Quick Links */}
        <div className="footer__col">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__list">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 – Stakeholders */}
        <div className="footer__col">
          <h3 className="footer__title">Stakeholders</h3>
          <ul className="footer__list">
            {stakeholders.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          < h3 className="footer__title">Contact Info</h3>
          <address className="footer__address">
            Chennai Unified Metropolitan Transport Authority (CUMTA) 7th Floor,
            MetroS, No.327, Anna Salai, Nandanam, Chennai, Tamil Nadu – 600035.
          </address>
          <p className="footer__phones">
            <a href="tel:04424322377">044 - 24322377</a>
            <br />
            <a href="tel:04428552355">044 - 28552355</a>
          </p>
          <a className="footer__email" href="mailto:office@cumta.in">
            office@cumta.in
          </a>
        </div>
      </div>

      <p className="footer__copy">
        © 2026 Chennai Unified Metropolitan Transport Authority. All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;