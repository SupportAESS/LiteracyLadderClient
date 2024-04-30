import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsTrash, BsPlus, BsDash } from 'react-icons/bs';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai"
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistedItems, setWishlistedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const session = localStorage.getItem("session");
      //console.log(session);
      if (session !== null) {
        // If session is set, fetch data from the backend API
        try {
          const userId = JSON.parse(session).user._id;
          const response = await axios.get('http://172.31.89.10:2211/getCartDetails', {
            params: { userId: userId }
          });
          // console.log(response.data);
          setCartItems(response.data);
        } catch (error) {
          console.error("Error fetching cart items: ", error);
          // Handle error
        }
      } else {
        // If session is not set, use data from localStorage
        const items = JSON.parse(localStorage.getItem("userData"));
        //console.log(JSON.parse(JSON.stringify(items.cartItem)));
        setCartItems(JSON.parse(JSON.stringify(items.cartItem)));
      }
    };

    const wishData = async () => {
      const session = localStorage.getItem("session");
      if (session !== null) {
        const userId = JSON.parse(session).user._id;
        try {
          const getData = await axios.get('http://172.31.89.10:2211/getWishlist', {
            params: { userId }
          });
          setWishlistedItems(getData.data);
        } catch (error) {
          console.error("Error fetching wishlisted items: ", error);
          // Handle error
        }
      }
    };
    fetchData();
    wishData();
  }, []);

  const updateQuantity = async (index, newQuantity) => {
    if (newQuantity <= 0) {
      deleteItem(index);
      return;
    }

    const updatedCartItem = { ...cartItems[index], quantity: newQuantity };
    const session = localStorage.getItem("session");
    if (session !== null) {
      try {
        await axios.put('http://172.31.89.10:2211/updateCartItem', updatedCartItem);
        const updatedCartItems = [...cartItems];
        updatedCartItems[index] = updatedCartItem;
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error("Error updating quantity: ", error);
        // Handle error
      }
    }
  };

  const deleteItem = async (index) => {
    const deletedCartItem = cartItems[index];
    const session = JSON.parse(localStorage.getItem("session"));
    if (session !== null) {
      try {
        const sendData = {
          userId: session.user._id,
          item: deletedCartItem
        }
        await axios.delete('http://172.31.89.10:2211/deleteCartItem', { data: sendData });
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error("Error deleting item: ", error);
        // Handle error
      }
    }
  };

  const deleteWishlistItem = async (index) => {
    const Item = wishlistedItems[index];
    // console.log(Item);
    const session = localStorage.getItem("session");
    if (session !== null) {
      try {
        const sendData = {
          userId: JSON.parse(session).user._id,
          item: Item
        }
        await axios.delete('http://172.31.89.10:2211/deleteWishlistItem', { data: sendData });
        const updatedwishlist = wishlistedItems.filter((_, i) => i !== index);
        setWishlistedItems(updatedwishlist);
      } catch (error) {
        console.error("Error deleting item: ", error);
        // Handle error
      }
    }
  };

  const update = async (product, index) => {
    const session = localStorage.getItem("session");
    const addToCart = async (product) => {
      if (session === null) {
        // Step 1: Retrieve existing data from local storage
        const existingDataString = localStorage.getItem('userData');
        // Step 2: Update or append new data
        // Check if the product already exists in the data
        if (existingDataString !== null) {
          let found = false;
          let parsedData = JSON.parse(existingDataString);
          let existingData = parsedData.cartItem;
          console.log(existingData);
          for (let entry of existingData) {
            if (entry.item._id === product._id) {
              entry.quantity += 1;
              found = true;
              break;
            }
          }

          if (!found) {
            existingData.push({
              item: product,
              quantity: 1
            });
          }
          parsedData.cartItem = existingData;
          localStorage.setItem('userData', JSON.stringify(parsedData));

          //console.log(localStorage.getItem('userData'));
        }
        else {
          const data = {
            cartItem: [{
              item: product,
              quantity: 1
            }]
          };
          localStorage.setItem('userData', JSON.stringify(data));
          //console.log(localStorage.getItem('userData'));
        }
      }
      else {
        const id = JSON.parse(session).user._id;
        const newData = {
          book: product,
          quantity: 1
        }
        const updatedCartItems = [...cartItems];
        const existingCartItemIndex = updatedCartItems.findIndex(item => item.book._id === product._id);
        if (existingCartItemIndex === -1) {
          updatedCartItems.push(newData);
          setCartItems(updatedCartItems);
          const data = {
            userId: id,
            book: product._id,
            quantity: 1
          };
          //console.log(data);
          try {
            const response = await axios.post("http://172.31.89.10:2211/addToCart", data);
            // if (response.status === 200) {
            //   toast.success("Added Item to cart", {
            //     theme: 'colored'
            //   });
            // }
            // else {
            //   toast.error("Failed due to Server error", {
            //     theme: 'colored'
            //   })
            // }
          }
          catch (error) {
            console.error('Error submitting form:', error);
            // Handle any errors that occur during the form submission process
            throw error;
          }
        }
      }
    }
    addToCart(product);
    deleteWishlistItem(index);
  }

  const addToWishlist = async (product) => {
    try {
      // Call API to add item to wishlist
      //console.log(product.book);
      console.log();
      const session = localStorage.getItem("session");
      if (session !== null) {
        const updatedWishlist = [...wishlistedItems];
        updatedWishlist.push(product.book);
        //wishlistedItems.push(product);
        setWishlistedItems(updatedWishlist);
        const id = JSON.parse(session).user._id;
        const data = {
          userId: id,
          bookId: product.book._id
        };
        const response = await axios.post("http://172.31.89.10:2211/addToWishlist", data);

        // if (response.status === 200) {
        //   toast.success("Added Item to wishlist", {
        //     theme: 'colored'
        //   });
        // } else {
        //   toast.error("Failed due to Server error", {
        //     theme: 'colored'
        //   });
        // }
        const index = cartItems.findIndex(item => item.book._id === product.book._id);
        deleteItem(index);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  let total = 0;

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-md overflow-hidden mt-9">
        <h2 className="text-3xl font-semibold pl-2 pt-2">Cart</h2>
        {cartItems.length === 0 ? (
          <div className="p-8 flex items-center justify-center">
            <div className="text-center flex flex-col items-center">
              <p className="mb-4 text-gray-900 font-bold text-4xl">Your cart is empty</p>
              <MdOutlineRemoveShoppingCart size={56} className="text-gray-400 mb-4" />
              <Link to="/" className="text-blue-500 hover:text-white font-bold border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-800">Continue shopping</Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                total = total + item.quantity * item.book.bookPrice,
                <div key={index} className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.book.bookImage} alt="Book cover" className="w-16 h-24" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.book.bookName}</h3>
                      <p className="text-gray-500">{item.quantity}</p>
                      <p className="text-gray-600">Price: ₹{item.book.bookPrice}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <button onClick={() => updateQuantity(index, item.quantity - 1)} className="text-red-500 cursor-pointer"><BsDash size={20} /></button>
                      <button onClick={() => updateQuantity(index, item.quantity + 1 > item.book.bookQuantity ? item.quantity : item.quantity + 1)} className="text-green-500 cursor-pointer"><BsPlus size={20} /></button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button onClick={() => deleteItem(index)} className="text-red-500 cursor-pointer transition-transform hover:scale-110"><BsTrash /></button>
                      <button onClick={() => addToWishlist(item)} className="text-red-600 cursor-pointer transition-transform hover:scale-110"><AiOutlineHeart size={20} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {
              cartItems.length !== 0 ? (
                <div className="p-4 flex items-center justify-between bg-gray-100">
                  <p className="text-lg font-semibold">Total: ₹{total}</p>
                  <Link to="/cart/checkout" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Checkout</Link>
                </div>
              ) : total = 0
            }
          </div>
        )}
        {/* Wishlisted items */}
        {wishlistedItems.length > 0 && (
          <div className="divide-y divide-gray-200">
            <h2 className="text-3xl font-semibold mb-4 pl-2 pt-2">Saved for later</h2>
            {wishlistedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <img src={item.bookImage} alt="Book cover" className="w-16 h-24" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.bookName}</h3>
                    <p className="text-gray-600">Author: {item.author}</p>
                    <p className="text-gray-600">Price: ₹{item.bookPrice}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <button onClick={() => deleteWishlistItem(index)} className="text-red-500 cursor-pointer transition-transform hover:scale-110"><BsTrash /></button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FiShoppingCart onClick={() => update(item, index)} size={20} className="cursor-pointer transition-transform hover:scale-110 text-blue-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
