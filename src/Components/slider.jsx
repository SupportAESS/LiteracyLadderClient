import React, { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { HiSearch } from 'react-icons/hi';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Slider() {
  const session = localStorage.getItem("session");

  const slides = [
    {
      url: 'https://alsharaypucollege.com/wp-content/uploads/2016/05/Books-banner.png'
    },
    {
      url: 'https://media.istockphoto.com/id/1173671270/photo/a-stack-of-leather-bound-books-with-gold-decoration.webp?s=2048x2048&w=is&k=20&c=q5PZ1fzdheODYcl0Uks9eprRCYWrlR7mysAL1-SK7yE='
    },
    {
      url: 'https://media.istockphoto.com/id/1189397041/photo/old-books-on-wooden-shelf.webp?s=2048x2048&w=is&k=20&c=EFRXRQD9i7tQrRgJN9QbOrK2zwASDHjRFxxPG9m78ws='
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isSearch, setSearchView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const onChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onSearch = () => {
    // Perform the actual search operation
    setSearchView(true);
    setIsLoading(true);
    fetchSearchResults();
  };

  const fetchSearchResults = () => {
    // Make a GET request to fetch search results based on searchValue
    // Replace the URL with your backend endpoint
    if(searchValue == ''){
      setSearchView(false);
    }
    fetch(`http://172.31.89.10:2211/searchBook?searchQuery=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data); // Update searchResults state with fetched data
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        setIsLoading(false);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const handleHover = (product) => {
    if (product) {
      setIsHovering(true);
      setHoveredProduct(product);
    }
  };

  const handleLeave = () => {
    setIsHovering(false);
    setHoveredProduct(null);
  };

  const addToCart = async (product) => {
    // Implement addToCart functionality
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
  };

  const addToWishlist = async (product) => {
    try {
      // Call API to add item to wishlist
      const id = JSON.parse(session).user._id;
      const data = {
        userId: id,
        bookId: product._id
      };
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="p-4">
      <div className="relative">
        <div
          className="w-full h-[360px] md:h-[480px] bg-gray-200 overflow-hidden rounded-lg relative"
          style={{ backgroundImage: `url(${slides[currentIndex].url})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
        >
          {/* Search Bar */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-75 rounded-lg px-4 py-2 w-3/5 flex items-center">
            <button onClick={onSearch}><HiSearch className="text-white mr-2" /></button>
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-white"
              value={searchValue}
              onChange={onChange}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition duration-300 focus:outline-none"
          >
            <BsChevronLeft size={30} />
          </button>
          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition duration-300 focus:outline-none"
          >
            <BsChevronRight size={30} />
          </button>
        </div>
      </div>
      {/* Search Results */}
      {isSearch &&(
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Search Results</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : searchResults.length === 0 ? (
          <p>No matching results found</p>
        ) : (
          <div className="grid grid-cols-6 gap-4 justify-center">
            {searchResults.map((product, index) => (
              <div
                key={product._id}
                className="relative bg-white text-black rounded-xl overflow-hidden h-96"
                onMouseEnter={() => handleHover(product)}
                onMouseLeave={handleLeave}
              >
                <img src={product.bookImage} alt="" className="w-full h-full" />
                {isHovering && hoveredProduct === product && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white text-black p-4">
                    <p className="text-2xl font-semibold">{product.bookName}</p>
                    <p className="text-lg font-serif font-bold">Author: {product.author}</p>
                    <p className="text-base font-sans font-bold">Price: ₹ {product.bookPrice}</p>
                    <div className="flex flex-row gap-6 items-center">
                      <FiShoppingCart
                        onClick={() => addToCart(product)}
                        size={30}
                        className="cursor-pointer transition-transform hover:scale-110 text-blue-500"
                      />
                      <Link
                        to={`/product/${product.bookName}`}
                        className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl mt-2"
                      >
                        View Details
                      </Link>
                      <FaRegHeart
                        onClick={() => addToWishlist(product)}
                        size={30}
                        className="cursor-pointer transition-transform hover:scale-110 text-red-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      )}
    </div>
  );
}

export default Slider;
