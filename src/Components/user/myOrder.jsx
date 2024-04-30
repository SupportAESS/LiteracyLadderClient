import React, { useEffect, useState } from 'react';
import OrderDetails from '../Order/OrderDetails';
import axios from 'axios';
import moment from 'moment';

const OrderPage = () => {
    const [Orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const session = localStorage.getItem("session");
            if (session !== null) {
                const userId = JSON.parse(session).user._id;
                const response = await axios.get("http://172.31.89.10:2211/getOrders", {
                    params: { userId: userId }
                });
                //console.log(response.data);
                setOrders(response.data);
            }
        };
        fetchData();
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleBackToOrders = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            {selectedOrder ? (
                <OrderDetails order={selectedOrder} handleBackToOrders={handleBackToOrders} />
            ) : (
                <div>
                    {Orders.map((order, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className={`inline-block py-1 px-2 text-sm font-semibold ${order.orderStatus === 'confirm' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-800'} rounded-md`}>{order.orderStatus}</span>
                                <span className="ml-2 text-sm text-gray-600">{moment(order.timeStamp).format('MMMM, Do YYYY')}</span>
                            </div>
                            <div>
                                <button className="text-blue-500 hover:text-blue-700" onClick={() => handleViewDetails(order)}>View Details</button>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 pt-4">
                            {order.cartItems.map((item, i) => (
                                <div key={i} className="flex items-center justify-between mt-2 mb-2">
                                    <div className="flex items-center">
                                        <img src={item.bookId.bookImage} alt={item.bookId.bookName} className="w-12 h-12 object-cover mr-2" />
                                        <div>
                                            <span className="text-gray-800">{item.bookId.bookName}</span>
                                            <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="text-gray-800">₹{item.bookId.bookPrice}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-gray-800 font-semibold">Total <span className="text-sm">(inc. disc. & tax)</span>:</span>
                                </div>
                                <div>
                                    <span className="text-gray-800 font-semibold">₹{(order.totalAmount * 0.01 ).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
