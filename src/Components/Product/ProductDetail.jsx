import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

const ProductDetail = () => {
    const { productId } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://172.31.89.10:2211/viewBook", {
                    params: {
                        "searchBy": "BookName",
                        "bookName": productId
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const addToWishlist = async (product) => {
        const session = localStorage.getItem("session");
        if (session !== null) {
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
        }
    };

    const addToCart = async (product) => {
        const session = localStorage.getItem("session");
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

    return (
        <div className='min-h-screen'>
            {data.map((item, index) => (
                <section key={index} className=" bg-slate-200 flex-none mx-auto max-w-[1250px] lg:w-full pt-14 lg:grid lg:grid-cols-2 lg:pt-10">
                    {/* Image column */}
                    <div className="w-full lg:justify-center lg:w-full lg:pt-10 lg:pr-2 border-r-2">
                        <img src={item.bookImage} alt={item.bookName}
                            className="mx-auto mt-10 w-2/3 h-2/3" />
                        <div className="mt-7 flex flex-row items-center gap-6">
                            <button
                                onClick={() => addToCart(item)}
                                className="flex h-12 w-1/3 lg:w-2/3  ml-3 rounded items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800">
                                <BiShoppingBag className="mx-2" />
                                Add to cart
                            </button>
                            <button onClick={() => addToWishlist(item)} className="flex h-12 w-1/3 lg:w-2/3 rounded items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
                                <AiOutlineHeart className="mx-2" />
                                Wishlist
                            </button>
                        </div>
                    </div>
                    {/* Description column */}
                    <div className="bg-gray-100 mt-5 lg:pt-10 pt-5">
                        <h2 className="text-3xl font-bold ml-3 mb-2">{item.bookName}</h2>
                        <p className="mt-5 font-bold text-lg ml-3">
                            Availability:{" "}
                            <span className={item.bookQuantity > 0 ? "text-green-600" : "text-red-600"}>
                                {item.bookQuantity > 0 ? "In Stock" : "Expired"}
                            </span>
                        </p>
                        <p className="font-bold text-lg ml-3">Author: <span className="font-normal">{item.author}</span></p>
                        <p className="font-bold text-lg ml-3">Genre: <span className="font-normal">{item.genre}</span></p>
                        <p className="font-bold text-lg ml-3">ISBN: <span className="font-normal">{item.isbn}</span></p>
                        <p className="mt-4 text-4xl font-bold text-violet-900 ml-3">₹ {item.bookPrice}</p>
                        <p className="pt-5 text-lg leading-5 text-gray-600 ml-3 mr-10">{item.bookDescription}</p>
                        {/* <div className="mt-6 ml-3">
                            <p className="pb-2 text-lg font-bold">Quantity</p>
                            <div className="flex">
                                <button className={`${plusMinuceButton}`}>−</button>
                                <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">1</div>
                                <button className={`${plusMinuceButton}`}>+</button>
                            </div>
                        </div> */}
                        <div className="mx-auto px-5 lg:px-5 mt-6 lg:mt-2 lg:pl-5 w-full">
                            <h3 className="text-2xl font-semibold mb-3">Review</h3>
                            <div className="flex items-center ml-2">
                                <Rater
                                    style={{ fontSize: "30px" }}
                                    total={5}
                                    interactive={true}
                                    rating={0}
                                />
                            </div>
                            <textarea className="w-3/4 h-32 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring focus:border-blue-500 resize-none" placeholder="Write your review here..."></textarea>
                            <br></br>
                            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit Review</button>
                        </div>

                    </div>
                </section>
            ))}
        </div>
    );
}

export default ProductDetail;


