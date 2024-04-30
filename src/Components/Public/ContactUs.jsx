import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm('LiteracyLadder', 'template_yp8wkv9', e.target, 'tXVPxxq_dX4fjUab2')
      .then((result) => {
        console.log(result.text);
        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
      }, (error) => {
        console.error('Error sending email:', error);
        setError('Failed to send email. Please try again later.');
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4 h-screen">
    <div className="max-w-md mx-auto mt-20 px-10 py-10 rounded-lg bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Message:</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
      {sent && <p className="mt-4 text-green-500 text-center">Email sent successfully!</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
    </div>
  );
};

export default ContactUs;
