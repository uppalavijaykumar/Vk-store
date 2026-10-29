import React, { useEffect } from 'react';
import './Policies.css';

function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>Terms &amp; Conditions</h1>
          <p className="policy-last-updated">Last updated: October 2026</p>
        </div>

        <p className="policy-intro">
          Welcome to VK Store. By accessing or using our website, you agree to be bound by these Terms 
          and Conditions. Please read them carefully before making any purchase or using our services.
        </p>

        <div className="policy-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing, browsing, or using the VK Store website and services, you acknowledge that you 
            have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree 
            with any part of these terms, you should not use our website or services.
          </p>
          <ul>
            <li>These terms apply to all users, visitors, and customers of VK Store</li>
            <li>You must be at least 18 years of age to make a purchase on our platform</li>
            <li>By creating an account, you confirm that the information provided is accurate and complete</li>
            <li>We reserve the right to refuse service to anyone at our discretion</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>2. Products &amp; Pricing</h2>
          <p>
            We strive to provide accurate product descriptions, images, and pricing on our website. However:
          </p>
          <ul>
            <li>Product images are for illustrative purposes; actual products may vary slightly in color or appearance</li>
            <li>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise</li>
            <li>Prices are subject to change without prior notice</li>
            <li>In the event of a pricing error, we reserve the right to cancel the order and issue a full refund</li>
            <li>Product availability is subject to stock and may change at any time</li>
          </ul>
          <div className="policy-highlight">
            <p>All prices displayed on VK Store are in Indian Rupees (₹) and include GST where applicable.</p>
          </div>
        </div>

        <div className="policy-section">
          <h2>3. Orders &amp; Payments</h2>
          <p>
            When you place an order on VK Store, you agree to the following:
          </p>
          <ul>
            <li>An order is confirmed only after successful payment verification</li>
            <li>We accept payments via UPI, credit/debit cards, net banking, wallets, and cash on delivery</li>
            <li>We reserve the right to cancel any order suspected of fraud or unauthorized payment</li>
            <li>Order confirmation will be sent via email and SMS to the contact details provided</li>
            <li>Cash on Delivery (COD) is available for orders up to ₹10,000 at select locations</li>
          </ul>

          <h3>Order Cancellation</h3>
          <p>
            You may cancel your order before it has been shipped. Once an order is shipped, cancellation 
            is not possible, but you may initiate a return after delivery as per our Return Policy.
          </p>
        </div>

        <div className="policy-section">
          <h2>4. Shipping &amp; Delivery</h2>
          <p>
            Shipping and delivery of orders are governed by our Shipping Policy. Key points include:
          </p>
          <ul>
            <li>We ship to all serviceable pin codes across India</li>
            <li>Standard shipping (₹99) and Express shipping (₹199) options are available</li>
            <li>Free standard shipping on orders above ₹999</li>
            <li>Estimated delivery times vary by location and shipping method</li>
            <li>Risk of loss and title for items pass to you upon delivery</li>
            <li>We are not responsible for delays caused by logistics partners or force majeure events</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>5. Returns &amp; Refunds</h2>
          <p>
            Returns and refunds are processed according to our Return Policy. Key highlights:
          </p>
          <ul>
            <li>Returns are accepted within 7 days of delivery</li>
            <li>Items must be unused, unworn, and in original packaging with tags intact</li>
            <li>Refunds are processed within 5–7 business days to the original payment method</li>
            <li>Certain items such as innerwear, personalized products, and gift cards are non-returnable</li>
            <li>Shipping charges are non-refundable unless the return is due to our error</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law:
          </p>
          <ul>
            <li>VK Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products</li>
            <li>Our total liability shall not exceed the amount paid by you for the specific product or service giving rise to the claim</li>
            <li>We are not responsible for any loss or damage resulting from unauthorized access to your account</li>
            <li>We do not guarantee uninterrupted or error-free operation of our website</li>
            <li>Product warranties, if any, are provided by the respective manufacturers and not by VK Store</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>7. Changes to Terms</h2>
          <p>
            VK Store reserves the right to update, modify, or replace these Terms and Conditions at any 
            time without prior notice. Changes become effective immediately upon posting to our website.
          </p>
          <ul>
            <li>We encourage you to review these terms periodically for any updates</li>
            <li>Continued use of our website after changes constitutes acceptance of the revised terms</li>
            <li>Material changes will be communicated via email or a prominent notice on our website</li>
          </ul>
          <div className="policy-highlight">
            <p>By continuing to use VK Store after any modifications to these terms, you agree to be bound by the updated Terms and Conditions.</p>
          </div>
        </div>

        <div className="policy-contact">
          <h3>Questions About These Terms?</h3>
          <p>If you have any questions about our Terms and Conditions, please contact us:</p>
          <p>📧 Email: <a href="mailto:legal@vkstore.in">legal@vkstore.in</a></p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>📍 Address: VK Store Pvt. Ltd., Bangalore, Karnataka, India</p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
