import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useState, useEffect } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [cart, setcart] = useState({})
  const [subtotal, setsubtotal] = useState(0)
  const router = useRouter()
  const [user, setuser] = useState({ value: null })
  const [key, setkey] = useState()
  const [progress, setProgress] = useState()

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
        // console.log(cart)
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }

    //get the jwt token for checking that user is logged in or not
    const token = localStorage.getItem("token")
    if (token) {
      setuser({ value: token })
      setkey(Math.random())
    }

  }, [router.query])

  //listeners for top loading bar
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
  })

  const logout = () => {
    localStorage.removeItem("token")
    setuser({ value: null })
    setkey(Math.random())

    toast.success('You are successfully logged out', {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    router.push("/")
  }

  const saveCart = (myCart) => {
    // console.log(myCart)
    localStorage.setItem("cart", JSON.stringify(myCart))
    // console.log(localStorage.getItem("cart"))
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setsubtotal(subt)
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    // alert("add")
    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }
    // console.log(newCart)
    setcart(newCart)
    // console.log(cart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setcart({})  // when we update any state variable then it is not gauranteed that it will reflect changes immediately it may take few miliseconds
    //so it is better to update from localstorage also
    saveCart({})
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    setcart(newCart)
    saveCart(newCart)
  }

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = { itemCode: { qty: 1, price, name, size, variant } }
    saveCart(newCart)
    // console.log(newCart)
    setcart(newCart)
    // console.log(cart)
    router.push('/checkout')
  }

  return <>
    <LoadingBar
      color='#ff2d55'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    <ToastContainer />
    <Navbar logout={logout} user={user} key={key} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} cart={cart} subtotal={subtotal} />
    <div className='pt-24'>
    <Component buyNow={buyNow} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} cart={cart} subtotal={subtotal} {...pageProps} />
    </div>
    <Footer />
  </>
}
