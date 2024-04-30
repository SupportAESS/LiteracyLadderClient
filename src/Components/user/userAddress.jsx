import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import axios from 'axios';
import { toast } from 'react-toastify';

function AddAddressForm({ onSubmit }) {
    const [address, setAddress] = useState({
        refUser: '',
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        isDefault: false,
        mobileNumber: '',
        alternativeMobileNumber: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
        // Clear error message when user starts typing
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate mobile number
        if (address.mobileNumber.length !== 10) {
            newErrors.mobileNumber = 'Mobile number must be 10 digits';
            isValid = false;
        }

        // Validate postal code
        if (address.postalCode.length !== 6) {
            newErrors.postalCode = 'Postal code must be 6 digits';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const sessionData = localStorage.getItem('session');
        const data = JSON.parse(sessionData);
        address.refUser = data.user._id;

        onSubmit(address);
        setAddress({
            refUser: '',
            street: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            isDefault: false,
            mobileNumber: '',
            alternativeMobileNumber: ''
        });

        try {
            const response = await axios.post('http://172.31.89.10:2211/userAddressSave', address);
            if (response.status === 200) {
                toast.success("Success Address Added", {
                    theme: 'colored'
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred', {
                theme: 'colored'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="street" className="text-gray-700 font-bold mb-1">
                        <span className="text-red-500">*</span> Street:
                    </label>
                    <input type="text" id="street" name="street" value={address.street} onChange={handleChange} required className={`p-2 border rounded-md focus:outline-none focus:ring ${errors.street ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.street && <p className="text-sm text-red-500">{errors.street}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="city" className="text-gray-700 font-bold mb-1">
                        <span className="text-red-500">*</span> City:
                    </label>
                    <input type="text" id="city" name="city" value={address.city} onChange={handleChange} required className={`p-2 border rounded-md focus:outline-none focus:ring ${errors.city ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="state" className="text-gray-700 font-bold mb-1">
                        <span className="text-red-500">*</span> State:
                    </label>
                    <input type="text" id="state" name="state" value={address.state} onChange={handleChange} required className={`p-2 border rounded-md focus:outline-none focus:ring ${errors.state ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="country" className="text-gray-700 font-bold mb-1">
                        <span className="text-red-500">*</span> Country:
                    </label>
                    <input type="text" id="country" name="country" value={address.country} onChange={handleChange} required className={`p-2 border rounded-md focus:outline-none focus:ring ${errors.country ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="postalCode" className="text-gray-700 font-bold mb-1">
                        <span className="text-red-500">*</span> Postal Code:
                    </label>
                    <input type="number" id="postalCode" name="postalCode" value={address.postalCode} onChange={handleChange} required className={`p-2 border rounded-md focus:outline-none focus:ring ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="mobileNumber" className="text-gray-700 font-bold mb-1">
                        <span className="text-red-500">*</span> Mobile Number:
                    </label>
                    <input type="tel" id="mobileNumber" name="mobileNumber" value={address.mobileNumber} onChange={handleChange} required className={`p-2 border rounded-md focus:outline-none focus:ring ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.mobileNumber && <p className="text-sm text-red-500">{errors.mobileNumber}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="alternativeMobileNumber" className="text-gray-700 font-bold mb-1">
                        Alternative Mobile Number:
                    </label>
                    <input type="tel" id="alternativeMobileNumber" name="alternativeMobileNumber" value={address.alternativeMobileNumber} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring" />
                    <p className="text-sm text-gray-500">This field is optional.</p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="isDefault" className="flex items-center">
                        <input type="checkbox" id="isDefault" name="isDefault" checked={address.isDefault} onChange={() => setAddress({ ...address, isDefault: !address.isDefault })} className="mr-2 rounded focus:outline-none focus:ring" />
                        <span className="text-gray-700">Default Address</span>
                    </label>
                </div>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:ring focus:border-blue-500">Add Address</button>
            <p className="mt-2 text-sm text-gray-500">Note: Fields marked with <span className="text-red-500">*</span> are mandatory.</p>
        </form>
    );
}


function UserAddress() {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    useEffect(() => {
        const userData = getUserData();
        userData.then(value => {
            //console.log(value.addresses); // Output: "8435963744"
            if (value.addresses) {
                setUser(value.addresses);
                if (value.addresses) {
                    setAddresses(value.addresses);
                } else {
                    setAddresses([]);
                }
            } else {
                // Handle user not logged in
                // Redirect to login page or show a message
            }
        }).catch(error => {
            console.error(error);
        });
        //console.log(userData);
    }, []);

    const getUserData = async () => {
        const sessionData = localStorage.getItem('session');
        //console.log(sessionData);
        const id = JSON.parse(sessionData);
        const refUser = id.user._id;

        try {
            const response = await axios.get(`http://172.31.89.10:2211/userAddressGet?userId=${refUser}`);

            if (response.data && response.data.ok) {
                return response.data.address; // Return the actual response data
            }
        } catch (e) {
            console.log(e);
        }

        return null; // Return null if there's an error or no session data
    };

    const deleteAddress = async (addressId) => {
        //console.log(addressId);
        const deleteAddress = {
            "addressId": addressId
        }
        try {
            const response = await axios.delete(`http://172.31.89.10:2211/deleteAddress/`, {
                data: { addressId: addressId } // Pass the addressId to be deleted
            });
            if (response.status === 200) {
                // Address deleted successfully from the server
                // Remove the address from the state
                const updatedAddresses = addresses.filter(address => address._id !== addressId);
                setAddresses(updatedAddresses);
                // Optionally, display a success message to the user
                toast.success('Address deleted successfully', {
                    theme: 'colored'
                });
            } else if (response.status === 201) {
                // Handle specific error message from the server
                const errorMessage = response.data.message; // Assuming the server sends error message in response
                toast.error(errorMessage, {
                    theme: 'colored'
                });
            } else {
                // Handle other status codes or display an error message
                toast.error('Failed to delete address:', {
                    theme: 'colored'
                });
                // Optionally, display an error message to the user
            }
        } catch (error) {
            console.error('Error deleting address:', error);
            // Handle errors or display an error message
        }
        
    };



    const addAddress = (newAddress) => {
        // Assuming you have a function to post the new address to the backend
        // Replace this with your actual API call to post the data to the server
        // Also, assuming the backend returns the updated user data with the new address included
        // Here, we just update the state with the new address
        setAddresses([...addresses, newAddress]);
        setShowForm(false); // Close the form after adding the address
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Addresses</h2>
            <div className="relative">
                <div className="mb-4">
                    <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {showForm ? 'Hide Form' : 'Add Address'}
                    </button>
                </div>
                {showForm && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-8 max-w-md relative">
                            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-700"
                                onClick={() => setShowForm(false)}>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <AddAddressForm onSubmit={addAddress} />
                            <button onClick={() => setShowForm(false)} className="absolute bottom-2 right-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Hide Form
                            </button>
                        </div>
                    </div>
                )}


            </div>
            <div>
                {addresses && addresses.map((address, index) => (
                    <div key={index} className="border border-gray-300 p-4 my-4 rounded-lg">
                        <p><strong className="text-blue-700">Street:</strong> {address.street}</p>
                        <p><strong className="text-blue-700">City:</strong> {address.city}</p>
                        <p><strong className="text-blue-700">State:</strong> {address.state}</p>
                        <p><strong className="text-blue-700">Country:</strong> {address.country}</p>
                        <p><strong className="text-blue-700">Postal Code:</strong> {address.postalCode}</p>
                        <p><strong className="text-blue-700">Is Default:</strong> {address.isDefault ? 'Yes' : 'No'}</p>
                        <p><strong className="text-blue-700">Mobile Number:</strong> {address.mobileNumber}</p>
                        <p><strong className="text-blue-700">Alternative Mobile Number:</strong> {address.alternativeMobileNumber}</p>
                        <button onClick={() => deleteAddress(address._id)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserAddress;
