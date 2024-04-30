import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-20 rounded-lg bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
        <p>
          Personal Information: When you create an account or place an order, we may collect personal information such as your name, email address, shipping address, and payment details.
        </p>
        <p>
          Usage Information: We collect information about how you interact with our website, such as your browsing history, pages visited, and device information (e.g., IP address, browser type).
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">How We Use Your Information</h2>
        <p>
          We use the information we collect to process orders and transactions, provide customer support, improve our products and services, personalize your experience, and communicate with you about promotions, updates, and new products.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Data Security</h2>
        <p>
          We are committed to protecting your personal information and take appropriate security measures to safeguard it against unauthorized access, disclosure, or alteration.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Third-Party Services</h2>
        <p>
          We may use third-party services, such as payment processors and shipping providers, to fulfill orders and provide certain functionalities. These third parties may have their own privacy policies governing the use of your information.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Cookies</h2>
        <p>
          We use cookies and similar technologies to enhance your browsing experience and provide personalized content. You can control cookies through your browser settings.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Your Choices</h2>
        <p>
          You have the right to access, update, or delete your personal information. You can also opt-out of marketing communications at any time by contacting us or using the unsubscribe link in the emails.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy or practices, please contact us at <a href="mailto:contact@literacyladder.com" className="text-blue-500">contact@literacyladder.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
