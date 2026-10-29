import React, { useEffect } from 'react';
import './Policies.css';

function ReturnPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>Return Policy</h1>
          <p className="policy-last-updated">Last updated: October 2026</p>
        </div>

        <p className="policy-intro">
          At VK Store, your satisfaction is our priority. If you are not completely happy with your purchase, 
          we're here to help with a hassle-free return process.
        </p>

        <div className="policy-section">
          <h2>📅 Return Window</h2>
          <p>
            You may request a return within <strong>7 days</strong> of receiving your order. Items must be 
            unused, unworn, and in their original packaging with all tags attached.
          </p>
          <div className="policy-highlight">
            <p>Returns must be initiated within 7 days of delivery. Items returned after this window will not be accepted.</p>
          </div>
        </div>

        <div className="policy-section">
          <h2>✅ Eligibility</h2>
          <p>To be eligible for a return, the following conditions must be met:</p>
          <ul>
            <li>The item must be unused, unwashed, and in its original condition</li>
            <li>All original tags, labels, and packaging must be intact</li>
            <li>The item must not be a final sale or non-returnable product</li>
            <li>Proof of purchase (order ID or invoice) is required</li>
          </ul>

          <h3>Non-Returnable Items</h3>
          <p>The following items cannot be returned:</p>
          <ul>
            <li>Innerwear, lingerie, and swimwear</li>
            <li>Personalized or customized products</li>
            <li>Gift cards and vouchers</li>
            <li>Items marked as "Final Sale" or "Non-Returnable"</li>
            <li>Beauty and personal care products (if opened or used)</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>🔄 Return Process</h2>
          <p>Follow these simple steps to initiate a return:</p>
          <ol>
            <li>
              <strong>Log in to your account</strong> — Go to your VK Store dashboard and navigate to 
              "My Orders" section
            </li>
            <li>
              <strong>Select the order</strong> — Find the order you wish to return and click 
              "Request Return"
            </li>
            <li>
              <strong>Choose the reason</strong> — Select the reason for return and upload photos if 
              the item is damaged or defective
            </li>
            <li>
              <strong>Schedule a pickup</strong> — Our logistics partner will pick up the item from your 
              address within 2–3 business days. You can also drop off the item at a nearby collection point
            </li>
          </ol>
        </div>

        <div className="policy-section">
          <h2>💰 Refund Method</h2>
          <p>
            Once we receive and inspect the returned item, your refund will be processed within 
            <strong> 5–7 business days</strong>. Refunds are issued to the original payment method:
          </p>
          <table className="policy-table">
            <thead>
              <tr>
                <th>Payment Method</th>
                <th>Refund Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>UPI / Net Banking</td>
                <td>3–5 business days</td>
              </tr>
              <tr>
                <td>Credit / Debit Card</td>
                <td>5–7 business days</td>
              </tr>
              <tr>
                <td>Cash on Delivery</td>
                <td>Refunded to bank account (5–7 business days)</td>
              </tr>
              <tr>
                <td>VK Store Wallet</td>
                <td>Instant</td>
              </tr>
            </tbody>
          </table>
          <p>
            Shipping charges are non-refundable unless the return is due to a defective or incorrect item.
          </p>
        </div>

        <div className="policy-section">
          <h2>⚠️ Damaged or Incorrect Items</h2>
          <p>
            If you receive a damaged, defective, or incorrect item, please contact us within 
            <strong> 48 hours</strong> of delivery. In such cases:
          </p>
          <ul>
            <li>We will arrange a free return pickup at no cost to you</li>
            <li>You may choose a full refund or a replacement</li>
            <li>Please share photos of the damaged/incorrect item for faster resolution</li>
            <li>Shipping charges will be fully refunded</li>
          </ul>
        </div>

        <div className="policy-contact">
          <h3>Need Help with a Return?</h3>
          <p>Our support team is available to assist you:</p>
          <p>📧 Email: <a href="mailto:returns@vkstore.in">returns@vkstore.in</a></p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>⏰ Working Hours: Mon–Sat, 9:00 AM – 6:00 PM IST</p>
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicy;
