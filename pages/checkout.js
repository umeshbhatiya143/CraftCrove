import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';

const Checkout = ({ cart, removeFromCart, addToCart, subtotal }) => {
  const ref = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = async (event) => {
    // Payment logic...
  };

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Checkout</h1>
      
      <h2 className="text-2xl font-medium text-gray-700 mb-4">1. Delivery Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Input fields for name, email, phone, etc. */}
        {[
          { label: 'Name', value: name, setter: setName, type: 'text' },
          { label: 'Email', value: email, setter: setEmail, type: 'email' },
          { label: 'Phone', value: phone, setter: setPhone, type: 'tel' },
          { label: 'City', value: city, setter: setCity, type: 'text' },
          { label: 'State', value: state, setter: setState, type: 'text' },
          { label: 'Pincode', value: pincode, setter: setPincode, type: 'text' },
        ].map(({ label, value, setter, type }, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
          rows="3"
          required
        />
      </div>

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
        <div className="font-bold mt-2">Subtotal: ₹{subtotal}</div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handlePayment} 
          className="flex items-center justify-center bg-pink-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-pink-600 transition duration-200"
        >
          <BsFillBagCheckFill className='mr-2' /> Pay ₹{subtotal}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
