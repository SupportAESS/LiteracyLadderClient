import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Layout';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/user/Login';
import Cart from './Components/Cart';
import UserProfile from './Components/user/dashboard';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
import Checkout from './Components/Order/CheckOut';
import ProductDetail from './Components/Product/ProductDetail';
import ContactUs from './Components/Public/ContactUs';
import PrivacyPolicy from './Components/Public/PrivacyPolicy';
import ForgotPasswordForm from './Components/user/forgotPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home />}/>
      <Route path='about' element={<About />}/>
      <Route path='login' element={<Login />}/>
      <Route path='cart' element={<Cart />}/>
      <Route path='userProfile' element={<ProtectedRoute Component={UserProfile} />}/> {/*Use ProtectedRoute for userProfile*/}
      <Route path='/product/:productId' Component={ProductDetail} />
      <Route path='/cart/checkout' element={<ProtectedRoute Component={Checkout} />}/>
      <Route path='/contactUs' element={<ContactUs />} />
      <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
      <Route path='/login/forgotPassword' element={<ForgotPasswordForm />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer/>
  </React.StrictMode>
);

