import React, { useEffect } from 'react';
import './Policies.css';

function ShippingPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>Shipping Policy</h1>
          <p className="policy-last-updated">Last updated: October 2026</p>
        </div>

        <p className="policy-intro">
          At VK Store, we are committed to delivering your orders quickly and safely. Please review our shipping 
          policy below to understand our shipping methods, costs, and delivery timelines.
        </p>

        <div className="policy-section">
          <h2>📍 Shipping Locations</h2>
          <p>
            We currently ship to all major cities and towns across India. We deliver to both urban and rural 
            areas through our trusted logistics partners. At this time, we do not offer international shipping.
          </p>
          <div className="policy-highlight">
            <p>We deliver across all 28 states and 8 union territories of India.</p>
          </div>
        </div>

        <div className="policy-section">
          <h2>🚚 Shipping Methods</h2>
          <p>We offer two shipping options to suit your needs:</p>
          <table className="policy-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Cost</th>
                <th>Estimated Delivery</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standard Shipping</strong></td>
                <td>₹99</td>
                <td>5–7 business days</td>
              </tr>
              <tr>
                <td><strong>Express Shipping</strong></td>
                <td>₹199</td>
                <td>2–3 business days</td>
              </tr>
            </tbody>
          </table>
          <p>
            Free standard shipping is available on orders above ₹999.
          </p>
        </div>

        <div className="policy-section">
          <h2>⏱️ Processing Time</h2>
          <p>
            All orders are processed within <strong>1–2 business days</strong> after payment confirmation. 
            Orders placed on weekends or public holidays will be processed on the next business day.
          </p>
          <ul>
            <li>Orders placed before 2:00 PM IST are typically processed the same day</li>
            <li>Orders placed after 2:00 PM IST are processed the following business day</li>
            <li>Custom or made-to-order items may require additional processing time of 3–5 business days</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>📦 Delivery Time</h2>
          <p>
            Delivery times depend on your location and the shipping method selected:
          </p>
          <ul>
            <li><strong>Metro cities</strong> (Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad): 2–5 business days</li>
            <li><strong>Tier 2 cities:</strong> 4–7 business days</li>
            <li><strong>Rural areas:</strong> 7–10 business days</li>
          </ul>
          <p>
            Please note that delivery times are estimates and may vary due to unforeseen circumstances.
          </p>
        </div>

        <div className="policy-section">
          <h2>📍 Order Tracking</h2>
          <p>
            Once your order is shipped, you will receive a confirmation email and SMS with your tracking 
            number and a link to track your shipment in real-time. You can also track your order through 
            your VK Store account dashboard under <strong>"Track My Order"</strong>.
          </p>
        </div>

        <div className="policy-section">
          <h2>⚠️ Shipping Delays</h2>
          <p>
            While we strive to deliver all orders on time, delays may occasionally occur due to:
          </p>
          <ul>
            <li>Adverse weather conditions or natural disasters</li>
            <li>Public holidays or regional festivals</li>
            <li>High-demand sale periods (e.g., festive season sales)</li>
            <li>Incorrect or incomplete delivery address provided by the customer</li>
            <li>Logistics partner delays beyond our control</li>
          </ul>
          <p>
            In case of significant delays, our customer support team will reach out to you with updates.
          </p>
        </div>

        <div className="policy-contact">
          <h3>Need Help?</h3>
          <p>If you have any questions about shipping, please contact us:</p>
          <p>📧 Email: <a href="mailto:support@vkstore.in">support@vkstore.in</a></p>
          <p>📞 Phone: +91 98765 43210</p>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;
