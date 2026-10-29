import React, { useEffect } from 'react';
import './Policies.css';

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>Privacy Policy</h1>
          <p className="policy-last-updated">Last updated: October 2026</p>
        </div>

        <p className="policy-intro">
          At VK Store, we value your privacy and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, store, and safeguard your data when you 
          use our website and services.
        </p>

        <div className="policy-section">
          <h2>📋 Information We Collect</h2>
          <p>We collect the following types of information when you interact with our platform:</p>
          
          <h3>Personal Information</h3>
          <ul>
            <li>Full name, email address, and phone number</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information (processed securely through our payment partners)</li>
            <li>Date of birth and gender (optional, for personalized offers)</li>
            <li>Account credentials (username and encrypted password)</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information (operating system, device model)</li>
            <li>Pages visited, time spent, and navigation patterns</li>
            <li>Referral source and search queries</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>🔧 How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders, including shipping and delivery</li>
            <li>Create and manage your account on VK Store</li>
            <li>Send order confirmations, shipping updates, and delivery notifications</li>
            <li>Provide customer support and respond to your inquiries</li>
            <li>Personalize your shopping experience with relevant product recommendations</li>
            <li>Send promotional emails, offers, and newsletters (with your consent)</li>
            <li>Improve our website, products, and services based on usage analytics</li>
            <li>Prevent fraud, unauthorized access, and other security threats</li>
            <li>Comply with legal obligations and regulatory requirements</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>🔒 Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information:
          </p>
          <ul>
            <li><strong>SSL Encryption:</strong> All data transmitted between your browser and our servers is encrypted using 256-bit SSL/TLS encryption</li>
            <li><strong>Secure Payment Processing:</strong> We do not store your credit/debit card details. All payment data is processed through PCI-DSS compliant payment gateways</li>
            <li><strong>Access Controls:</strong> Only authorized personnel have access to your personal data, on a need-to-know basis</li>
            <li><strong>Regular Audits:</strong> We conduct periodic security audits and vulnerability assessments</li>
            <li><strong>Data Backup:</strong> Your data is regularly backed up and stored securely across multiple data centers</li>
          </ul>
          <div className="policy-highlight">
            <p>While we take every precaution to protect your data, no method of transmission over the Internet is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.</p>
          </div>
        </div>

        <div className="policy-section">
          <h2>🍪 Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are 
            small text files stored on your device that help us:
          </p>
          <ul>
            <li>Remember your login session and preferences</li>
            <li>Keep items in your shopping cart between visits</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Deliver personalized content and targeted advertisements</li>
            <li>Measure the effectiveness of our marketing campaigns</li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences. However, disabling cookies 
            may affect certain features of our website.
          </p>
        </div>

        <div className="policy-section">
          <h2>🤝 Third-Party Services</h2>
          <p>
            We may share your information with trusted third-party service providers who assist us in 
            operating our business. These include:
          </p>
          <ul>
            <li><strong>Payment Processors:</strong> Razorpay, PayU for secure transaction processing</li>
            <li><strong>Logistics Partners:</strong> Delhivery, BlueDart, India Post for order delivery</li>
            <li><strong>Analytics:</strong> Google Analytics for website traffic analysis</li>
            <li><strong>Communication:</strong> Email and SMS service providers for order notifications</li>
          </ul>
          <p>
            These third parties are contractually obligated to protect your data and use it only for the 
            specific services they provide to us. We do not sell your personal data to third parties.
          </p>
        </div>

        <div className="policy-section">
          <h2>⚖️ Your Rights</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
            <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
            <li><strong>Restrict Processing:</strong> Request that we limit how we use your data</li>
          </ul>
          <p>
            To exercise any of these rights, please contact our privacy team at the details below.
          </p>
        </div>

        <div className="policy-contact">
          <h3>Contact Our Privacy Team</h3>
          <p>If you have any questions or concerns about this Privacy Policy:</p>
          <p>📧 Email: <a href="mailto:privacy@vkstore.in">privacy@vkstore.in</a></p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>📍 Address: VK Store Pvt. Ltd., Bangalore, Karnataka, India</p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
