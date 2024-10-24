// Checkout.js

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { jwtDecode } from 'jwt-decode';
import AddressForm from '../components/AddressForm'; // Import the AddressPopup component
import RazorpayButton from '@/components/RazorpayButton';
import { useRouter } from 'next/router';

const Checkout = ({ cart, removeFromCart, addToCart, subtotal }) => {
  const ref = useRef();
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState({});
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [userId, setUserId] = useState()
  const [userData, setUserData] = useState([]);

  const handleAddAddress = (newAddress) => {
    // Logic to save the new address to the user's saved addresses
    setUserData(prevData => ({
      ...prevData,
      savedAddresses: [...prevData.savedAddresses, newAddress]
    }));
  };

  const fetchUserData = async (userId) => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/api/user?id=${userId}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setUserData(data.user);

    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      fetchUserData(decodedToken.id);
    }
    else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    //re-render when new address added"
  }, [userData]);

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Checkout</h1>

      <h2 className="text-2xl font-medium text-gray-700 mb-4">1. Delivery Details</h2>

      {/* Saved Address Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Saved Address</label>
        <select
          value={selectedAddress ? selectedAddress.index : ''} // Bind the selected index
          onChange={(e) => {
            const selectedIndex = e.target.value;
            setSelectedAddress(userData.savedAddresses[selectedIndex]); // Set the selected address by its index
          }}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="">Select an address</option>
          {userData.savedAddresses?.map((address, index) => (
            <option key={index} value={index}>
              {address.name}, {address.city}, {address.state}, {address.pincode}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowAddAddress(true)}
          className="mt-2 text-pink-500 underline"
        >
          Add New Address
        </button>
      </div>

      {/* Address Popup */}
      <AddressForm
        isOpen={showAddAddress}
        onClose={() => setShowAddAddress(false)}
        onSave={handleAddAddress}
        userId={userId}
      />

      <h2 className="text-2xl font-medium text-gray-700 mt-6 mb-4">2. Review Cart Items</h2>
      <div ref={ref} className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 ? (
            <div className='my-4 font-semibold text-gray-600'>Your cart is empty!</div>
          ) : (
            Object.keys(cart).map((k) => (
              <li key={k} className="flex justify-between items-center border-b py-2">
                <div className='font-semibold text-gray-800'>
                  {cart[k].name} ({cart[k].size}/{cart[k].variant})
                </div>
                <div className='flex items-center'>
                  <AiFillMinusCircle
                    onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}
                    className='cursor-pointer text-pink-500'
                  />
                  <span className="mx-2">{cart[k].qty}</span>
                  <AiFillPlusCircle
                    onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}
                    className='cursor-pointer text-pink-500'
                  />
                </div>
              </li>
            ))
          )}
        </ol>
      </div>
      <div className="text-right font-bold text-xl">
        <span>Total: ₹{subtotal}</span>
      </div>

      {/* <button
        onClick={handlePayment}
        className="mt-4 w-full bg-pink-500 text-white font-semibold py-2 rounded-md shadow hover:bg-pink-600 transition duration-200"
      >
        Pay Now
      </button> */}

      {/* payment button */}

      <RazorpayButton
        amount={subtotal}
        userId={userId}
        orderItems={
          Object.keys(cart).map((key) => ({
            productId: key,
            quantity: cart[key]["qty"],
            price: cart[key]["price"],
          }))
        }
        shippingAddress={{
          address: selectedAddress.address,
          city: selectedAddress.city,
          state: selectedAddress.state,
          pincode: selectedAddress.pincode,
          country: selectedAddress.country
        }}
      />

    </div>
  );
};

export default Checkout;
