import { Link } from 'react-router-dom';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const POLICY_LINKS = [
  { label: 'Shipping Policy', path: '/shipping-policy' },
  { label: 'Return Policy', path: '/return-policy' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms' },
];

const SUPPORT_LINKS = [
  { label: 'Help & Support', path: '/support' },
  { label: 'Track My Order', path: '/track-order' },
  { label: 'FAQ', path: '/faq' },
  { label: 'My Orders', path: '/orders' },
];

const SOCIAL_LINKS = [
  { label: '📘', title: 'Facebook', url: 'https://facebook.com' },
  { label: '📸', title: 'Instagram', url: 'https://instagram.com' },
  { label: '▶️', title: 'YouTube', url: 'https://youtube.com' },
  { label: '🐦', title: 'Twitter', url: 'https://twitter.com' },
];

const PAYMENT_BADGES = ['Visa', 'Mastercard', 'RuPay', 'UPI', 'PayTM'];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer__top">
        {/* Brand Column */}
        <div className="footer__column">
          <div className="footer__brand-logo">
            <span className="footer__brand-logo-vk">VK</span>
            <span className="footer__brand-logo-store">&nbsp;STORE</span>
          </div>
          <p className="footer__brand-desc">
            Your one-stop shop for the best products at great prices. Quality you can trust, prices you'll love.
          </p>
          <div className="footer__socials">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.title}
                href={social.url}
                className="footer__social-link"
                title={social.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__column">
          <h4 className="footer__column-title">Quick Links</h4>
          <ul className="footer__column-links">
            {QUICK_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div className="footer__column">
          <h4 className="footer__column-title">Policies</h4>
          <ul className="footer__column-links">
            {POLICY_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer__column">
          <h4 className="footer__column-title">Customer Support</h4>
          <ul className="footer__column-links">
            {SUPPORT_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copyright">© 2026 VK Store. All rights reserved.</p>
          <div className="footer__payments">
            <span className="footer__payments-label">Secure Payments</span>
            {PAYMENT_BADGES.map((badge) => (
              <span key={badge} className="footer__payment-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
