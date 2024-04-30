import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import { toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from 'react-icons/fa';

function Product() {
  const [productsByGenre, setProductsByGenre] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  //const [cart, setCart] = useState([]); // State to manage the cart

  const session = localStorage.getItem("session");

  const genres = ["Fiction", "Action and Adventure", "Mystery", "Science Fiction", "Fantasy", "Horror", "Biography", "Auto-biography", "History", "Self-help", "Science", "Romance"];

  useEffect(() => {
    async function fetchData() {
      try {
        const genreData = {};
        const genrePromises = genres.map(async (genre) => {
          const search = {
            "searchBy": "BookGenre",
            "genre": genre
          };
          const response = await axios.get("http://172.31.89.10:2211/viewBook", {
            params: search
          });
          if (response.data.length > 0) {
            genreData[genre] = response.data;
          }
        });
        await Promise.all(genrePromises);
        setProductsByGenre(genreData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleHover = (product) => {
    setHoveredProduct(product);
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

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

        console.log(localStorage.getItem('userData'));
      }
      else {
        const data = {
          cartItem: [{
            item: product,
            quantity: 1
          }]
        };
        localStorage.setItem('userData', JSON.stringify(data));
        console.log(localStorage.getItem('userData'));
      }
    }
    else {
      const id = JSON.parse(session).user._id;
      const data = {
        userId: id,
        book: product._id,
        quantity: 1
      };
      //console.log(data);
      try {
        const response = await axios.post("http://172.31.89.10:2211/addToCart", data);
        if (response.status === 200) {
          toast.success("Added Item to cart", {
            theme: 'colored'
          });
        }
        else {
          toast.error("Failed due to Server error", {
            theme: 'colored'
          })
        }
      }
      catch (error) {
        console.error('Error submitting form:', error);
        // Handle any errors that occur during the form submission process
        throw error;
      }
    }
  }
  const addToWishlist = async (product) => {
    try {
      // Call API to add item to wishlist
      const id = JSON.parse(session).user._id;
      const data = {
        userId: id,
        bookId: product._id
      };
      const updatedCartItems = [...wishlist];
      const existingCartItemIndex = updatedCartItems.findIndex(item => item.book._id === product._id);
      if (existingCartItemIndex === -1) {
        updatedCartItems.push(data);
        setWishlist(updatedCartItems);
      }
      const response = await axios.post("http://172.31.89.10:2211/addToWishlist", data);
      if (response.status === 200) {
        toast.success("Added Item to wishlist", {
          theme: 'colored'
        });
      } else {
        toast.error("Failed due to Server error", {
          theme: 'colored'
        })
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };


  return (
    <>
      {Object.keys(productsByGenre).map(genre => (
        <div key={genre} className=''>
          <center><h2 className='text-4xl font-bold px-10 py-1 mt-6'>{genre}</h2></center>
          <div className='w-11/12 mx-auto bg-gray-800 bg-opacity-75 rounded-lg px-8 py-1'>
            <div className='mt-10 mb-10'>
              <Slider
                dots
                infinite={false}
                speed={500}
                slidesToShow={5}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]}
              >
                {productsByGenre[genre].map(product => (
                  <div
                    key={product._id}
                    className='relative bg-white text-black rounded-xl overflow-hidden h-96'
                    onMouseEnter={() => handleHover(product)}
                    onMouseLeave={() => handleLeave()}
                  >
                    <img src={product.bookImage} alt="" className='w-full h-full' />
                    {isHovering && hoveredProduct === product && (
                      <div className="absolute bottom-0 left-0 right-0 bg-white text-black p-4">
                        <p className='text-2xl font-semibold'>{product.bookName}</p>
                        <p className='text-lg font-serif font-bold'>Author: {product.author}</p>
                        <p className="text-base font-sans font-bold">Price: ₹ {product.bookPrice}</p>
                        <div className='flex flex-row gap-6 items-center'>
                          <FiShoppingCart onClick={() => addToCart(product)} size={30} className="cursor-pointer transition-transform hover:scale-110 text-blue-500" />
                          <Link to={`/product/${product.bookName}`} className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl mt-2'>View Details</Link>
                          {wishlist.some(item => item._id === product._id) ? (
                            <FaHeart size={30} className='text-red-500' />
                          ) : (
                            <FaRegHeart onClick={() => addToWishlist(product)} size={30} className='cursor-pointer transition-transform hover:scale-110 text-red-500' />
                          )}
                          {/* <FaRegHeart onClick={() => addToWishlist(product)} size={30} className='cursor-pointer transition-transform hover:scale-110 text-red-500' /> */}
                          {/* //Navigate to product page  */}
                        </div>
                      </div>
                    )}
                    {/* //Navigate to product page 
                    <Link to={`/${product._id}`}>View Details</Link>  */}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Product;
