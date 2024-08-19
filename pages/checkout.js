import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';

const Checkout = ({cart, removeFromCart, addToCart, subtotal}) => {
  const ref = useRef()
  const [amount, setAmount] = useState('');

  const handlePayment = async (event) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    //predefined template
    var option = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      name: "CraftCrove",
      description: "Test Transaction",
      image: "/logo.png",
      //passing the orderid geberated above
      order_id: order.id,
      handler: function (response) {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
      },
      //user billing Address ,we have pull user details and pass here
      prefill: {
        name: name,
        email: "kanikakur14@gmail,com",
        contact: "9000000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      //razorpay popup color
      theme: {
        color: "#3C096C",
      },
    };

    const Razorpay = (await import('razorpay')).default;
    var rzp1 = new Razorpay(option);
    //if payment fails
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
    event.preventDefault();
  };

  return (
    <div className='container px-2 m-auto py-5'>
      <h1 className="font-semibold text-3xl py-14 text-center">Checkout</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      <div className="m-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea name="address" id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>
      <div className="m-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="m-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="pincode" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <h2 className="font-bold text-xl">2. Review Cart Items & Pay</h2>
      <div ref={ref} className="sideCart bg-pink-100 p-6 m-2 ">
          
            <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is empty!</div>}
            {Object.keys(cart).map((k)=> {
             return  <li key={k}>
             <div className="item flex my-5">
              <div className='font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
             <div className='flex font-semibold items-center justify-center w-1/3 text-lg'>
              <AiFillMinusCircle onClick={()=> {removeFromCart(k, 1, cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-500'/> <span className="mx-2">{cart[k].qty}</span><AiFillPlusCircle 
              onClick={()=> {addToCart(k, 1, cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}}
              className='cursor-pointer text-pink-500' /> </div>
             </div>
            </li>
            })} 
            </ol>
            <span className="font-bold">Subtotal: {subtotal}</span>
        </div>
        <div className="mx-4">
        {/* <Link href={'/checkout'}> */}
          <button onClick={handlePayment}
           className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
           <BsFillBagCheckFill className='m-1' />Pay ₹{subtotal}
           </button>
          {/* </Link> */}
        </div>
    </div>
  )
}

export default Checkout
