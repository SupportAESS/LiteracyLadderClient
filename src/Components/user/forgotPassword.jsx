import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

const ForgotPasswordForm = () => {
  // State variables for form fields
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSendOTP, setOtpState] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isSendOTP){
        toast.error('OTP not found');
        return;
    }
    try {
      // Check if all fields are filled
      if (!email || !otp || !password || !confirmPassword) {
        // If any field is empty, display an error message and return
        toast.error('All fields are required');
        return;
      }
  
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        // If passwords don't match, display an error message and return
        toast.error('Passwords do not match');
        return;
      }
  
      // Prepare the data to send to the server
      const formData = { email, otp, password, confirmPassword };
  
      // Make a POST request to the server to handle form submission
      const response = await fetch('http://172.31.89.10:2211/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Display a success message
        toast.success('Password Successfully Changed');
        window.location.href = '/login';
      } else {
        // If the request failed, display an error message
        toast.error('Failed to Change Password');
        setEmail('');
        setOTP('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      // If an error occurs during form submission, log the error and display an error message
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };
  

  // Function to handle sending OTP
  const handleSendOTP = async(e) => {
    e.preventDefault();
    // Add your logic here to send OTP to the user's email
    console.log('Sending OTP to:', email);
    try {
        e.preventDefault();
  
        // Assuming email and fullName are defined somewhere in your code
        //const { email } = req.body;
  
        // Make a request to the generateOTP API to get the OTP
        const response = await fetch('http://172.31.89.10:2211/sendOTP', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate OTP.');
        }
  
        const { otp } = await response.json();
  
        // Prepare template parameters for the email
        const templateParams = {
          email: email,
          name: "User",
          otp: otp
        };
  
        // Send the email using emailjs
        const result = await emailjs.send('LiteracyLadder', 'template_h5lk6ad', templateParams, 'tXVPxxq_dX4fjUab2');
        console.log(result.text); // You can remove this line
        toast.success('Email sent successfully'); // Notify user of success
        setOtpState(true);
      } catch (error) {
        console.error('Error sending email:', error);
        toast.error('Failed to send email. Please try again later.'); // Notify user of error
        setError('Failed to send email. Please try again later.');
      }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto  bg-gray-100 rounded-lg px-10 py-10">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
          <input
            type="text"
            id="otp"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button id='ResetPassword' type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset Password</button>
        <button onClick={handleSendOTP} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
