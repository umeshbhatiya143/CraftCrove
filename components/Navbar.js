import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiOutlineMenu, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { RxCrossCircled } from "react-icons/rx";
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subtotal }) => {
  const ref = useRef()
  const [dropdown, setdropdown] = useState(false)
  const [userId, setUserId] = useState()
  const [menuOpen, setMenuOpen] = useState(false) // To handle the hamburger menu

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, [])

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0")
      ref.current.classList.add("translate-x-full")
    }
    else if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full")
      ref.current.classList.add("translate-x-0")
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <div className="z-20 flex justify-center md:justify-between w-full h-16 px-2 border-b border-gray-400 flex-row items-center mb-1 shadow-md fixed bg-white md:px-10">
        <div className="flex justify-between h-20 -ml-2 md:ml-0 md:h-28 w-full md:w-auto">
          <Link href="/" legacyBehavior>
            <a>
              <img src="/logo.png" className="object-cover h-full w-full" alt="logo" />
            </a>
          </Link>
        </div>

        {/* Nav Links - hidden on mobile */}
        <div className={`nav absolute lg:static top-0 left-0 w-full lg:w-auto bg-white pb-4 lg:pb-0 lg:flex items-center lg:justify-between font-bold text-md transition-all duration-300 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
          {/* Close Button for Mobile Menu */}
          <div className="absolute right-2 top-2 lg:hidden">
            <RxCrossCircled size={30} onClick={toggleMenu} className="cursor-pointer text-pink-500 hover:text-pink-700 transition duration-200" />
          </div>

          <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 mt-16 lg:mt-0 lg:space-x-2">
            <li className="relative group">
              <Link href="/" legacyBehavior>
                <a className="block px-4 py-2 text-gray-700 rounded-md hover:bg-pink-100 transition duration-200 group-hover:text-pink-600">
                  Home
                </a>
              </Link>
              {/* Underline effect on hover */}
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-pink-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </li>
            {['tshirts', 'hoodies', 'jeans', 'caps', 'shoes'].map((item) => (
              <li key={item} className="relative group">
                <Link href={`/${item}`} legacyBehavior>
                  <a className="block px-4 py-2 text-gray-700 rounded-md hover:bg-pink-100 transition duration-200 group-hover:text-pink-600">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </Link>
                {/* Underline effect on hover */}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-pink-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </li>
            ))}
          </ul>

          {/* Login/Signup Button */}
          {!user.value && <Link href="/login" legacyBehavior className='md:hidden'>
            <a className="w-fit md:hidden m-auto mt-4 md:mt-0 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-200 flex items-center justify-center">
              Login / Signup
            </a>
          </Link>}
        </div>



        {/* Cart & Account Section */}
        <div className="flex gap-2 cursor-pointer cart items-center">
          <span onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }}>
            {dropdown && <div className="absolute right-12 bg-white shadow-lg border top-8 py-2 rounded-md px-5 w-32">
              <ul>
                <Link href={`/profile/${userId}`}><a><li className='py-1 hover:text-pink-700 text-sm font-bold'>My Account</li></a> </Link>
                <Link href={"/orders"}><a><li className='py-1 hover:text-pink-700 text-sm font-bold'>Orders</li></a> </Link>
                <li onClick={logout} className='py-1 hover:text-pink-700 text-sm font-bold'>Logout</li>
              </ul>
            </div>}
            {user.value && <MdAccountCircle size={30} className='text-xl md:text-2xl mx-2' />}
          </span>
          {!user.value && <Link href={'/login'}><button className='hidden md:block bg-pink-600 px-2 py-1 rounded-md text-white mx-2'>Login/Signup</button></Link>}
          <AiOutlineShoppingCart size={30} onClick={toggleCart} className='text-xl md:text-2xl' />

          {/* hamburger */}
          <div className="flex items-center lg:hidden">
            <AiOutlineMenu size={30} onClick={toggleMenu} className="cursor-pointer" />
          </div>
        </div>

      </div>

      {/* Side Cart */}
      <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 right-0 bg-pink-100 p-8 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500">
          <AiFillCloseCircle />
        </span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className='flex font-semibold items-center justify-center w-1/3 text-lg'>
                  <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' />
                  <span className="mx-2">{cart[k].qty}</span>
                  <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' />
                </div>
              </div>
            </li>
          })}
        </ol>
        <span className="font-bold">Subtotal: {subtotal}</span>
        <div className="flex">
          <Link href={'/checkout'}>
            <button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
              <BsFillBagCheckFill className='m-1' /> Checkout</button>
          </Link>
          <button onClick={clearCart} className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
            Clear cart</button>
        </div>
      </div>
    </>
  )
}

export default Navbar;
