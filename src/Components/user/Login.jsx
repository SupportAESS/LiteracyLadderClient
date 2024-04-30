import React, { useState } from 'react';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOTP] = useState('');
  const [isSendOTP, setIsOTP] = useState(false);
  const [error, setError] = useState(null);
  const [otpState, setOtpState] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic

    // console.log('Logging in with email:', email, 'and password:', password);
    try {
      const response = await fetch('http://172.31.89.10:2211/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })

      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Response from server:', data.message);
        console.log('Session:', data.session);
        //console.log(response);
        // You can handle the response from the server accordingly, such as redirecting the user or showing a success message
        if (isLogin) {
          // Example: Set session data in local storage after successful login
          // Example: Set session data in local storage after successful login
          localStorage.setItem('session', JSON.stringify(data.session));

          // Example: Show toast notification
          toast.success("Login successful.", { theme: 'colored' });

          // Redirect to dashboard page
          window.location.href = '/userProfile';
        } else {
          // Example: Show a success message to the user after successful signup
          toast.success("Signup successful. Please login to continue.", {
            theme: 'colored'
          });
          //alert('Signup successful. Please login to continue.');
          // Optionally, you can also toggle the form to show the login form after successful signup
          setIsLogin(true);
        }
      } else if(response.status === 401){
        toast.error("Invalid email or password", {
          theme: 'colored'
        });
      }else {
        console.error('Failed to submit form:', response.statusText);
        // Handle error response from server
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle any errors that occur during the form submission process
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Handle signup logic
    if (!otpState) {
      toast.error('OTP is not verified.'); // Display error message using toastify
      return;
    }

    if (password != confirmPassword) {
      toast.error('Passwords do not match'); // Display error message using toastify
      return;
    }
    //console.log('Signing up with full name:', fullName, 'email:', email, 'and password:', password, 'confirmPassword:', confirmPassword);

    try {
      const response = await fetch('http://172.31.89.10:2211/userSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        })
      });

      if (response.status === 200) {
        // Signup successful
        const data = await response.json();
        toast.success(data.message); // Display success message using toastify
        // Clear the input fields
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFullName('');
        setOTP('');
        setIsLogin(false);
      }else if(response.status === 400){
        toast.error(`Passwords do not match`);
        
      }else if(response.status === 401){
        toast.error(`Email already exists`);
      } else {
        // Signup failed
        const responseData = await response.text();
        //console.error('Signup failed:', responseData);
        toast.error(`Signup failed. ${responseData}`); // Display generic error message using toastify
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.'); // Display generic error message using toastify
    }

  };

  const handleForgotPassword = () => {
    // Add your logic for handling forgot password here
    console.log("Forgot password clicked");
    // For example, you can redirect the user to the forgot password page
    window.location.href = '/login/forgotPassword';
  };
  


  const handleGoogleLogin = () => {
    // Handle login with Google logic
    console.log('Logging in with Google');
  };

  const handleSendOTP = async (e) => {
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
        name: fullName,
        otp: otp
      };

      // Send the email using emailjs
      const result = await emailjs.send('LiteracyLadder', 'template_h5lk6ad', templateParams, 'tXVPxxq_dX4fjUab2');
      console.log(result.text); // You can remove this line
      toast.success('Email sent successfully'); // Notify user of success
      setIsOTP(true);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email. Please try again later.'); // Notify user of error
      setError('Failed to send email. Please try again later.');
    }
  };


  const handleVerifyOTP = async () => {
    try {
      // Get the OTP input value
      const otpInput = otp;

      // Make sure OTP input is not empty
      if (!otpInput) {
        toast.error('Please enter the OTP.'); // Display error message using toastify
        return;
      }

      // Make an API request to verify OTP
      const response = await fetch('http://172.31.89.10:2211/otpVerification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "otp": otpInput, "email": email }) // Assuming you send the OTP to the backend
      });

      // Check if the response is successful (status code 200)
      if (response.ok) {
        // OTP verification successful
        toast.success('OTP is verified.'); // Display success message using toastify
        // Disable the OTP input field or perform any other actions
        document.getElementById('otpButton').disabled = true;
        setOtpState(true);
      } else {
        // OTP verification failed
        const data = await response.json(); // Parse response body as JSON
        toast.error(data.message); // Display error message to the user using toastify
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('An error occurred while verifying OTP. Please try again.'); // Display generic error message to the user using toastify
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{isLogin ? 'Log in' : 'Sign up'}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">{isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-indigo-600 hover:text-indigo-500">{isLogin ? 'Sign up' : 'Log in'}</button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={isLogin ? handleLogin : handleSignup}>
          <input type="hidden" name="remember" value="true" />
          {!isLogin && (
            <div>
              <label htmlFor="full-name" className="sr-only">Full Name</label>
              <input id="full-name" name="fullName" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
          )}
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {!isLogin && (
            <div>
              <input id="otp" name="otp" type="text" autoComplete="otp" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter OTP" value={otp} onChange={(e) => setOTP(e.target.value)} />
              <button
                id='otpButton'
                className={`mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isSendOTP ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}
                onClick={isSendOTP ? handleVerifyOTP : handleSendOTP}
                disabled={!email && !fullName}// Disable the button if the email field is empty
              >
                {isSendOTP ? 'Verify OTP' : 'Send OTP'}
              </button>
            </div>

          )}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          )}
          
          <div className="flex items-center justify-between">
          {isLogin&&(
            <div className="flex items-center">
              <button onClick={handleForgotPassword} className="text-sm text-gray-900 underline">
                Forgot password
              </button>
            </div>
          )}
            {/* <div className="text-sm">
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none" onClick={handleGoogleLogin}>
                Log in with Google
              </button>
            </div> */}
          </div>
          <div>
            <button id={isLogin ? 'LogIn' : 'SignUp'} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: lock-closed */}
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M4 8V6a6 6 0 1112 0v2h2a1 1 0 011 1v7a3 3 0 01-3 3H4a3 3 0 01-3-3V9a1 1 0 011-1h2zm8 2h-4a1 1 0 00-1 1v5h6v-5a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </span>
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
