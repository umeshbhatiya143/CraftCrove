import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useState, useEffect } from 'react'
import React from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setcart] = useState({})
  const [subtotal, setsubtotal] = useState(0)
  useEffect(() => {
   console.log("hello I am useEffect from _app.js")
   try{
      if(localStorage.getItem("cart")){
        setcart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
        // console.log(cart)
      }
   }catch(error){
    console.log(error)
    localStorage.clear()
   }
  }, [])

  const saveCart = (myCart) => {
    // console.log(myCart)
    localStorage.setItem("cart", JSON.stringify(myCart))
    // console.log(localStorage.getItem("cart"))
    let subt = 0;
    let keys = Object.keys(myCart)
    for(let i=0;i<keys.length;i++){
      subt+= myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setsubtotal(subt)
  }

  const addToCart = (itemCode,qty,price,name,size,variant) => {
    // alert("add")
    let newCart = cart
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else{
      newCart[itemCode] = {qty: 1, price,name,size,variant}
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

  const removeFromCart = (itemCode,qty,price,name,size,variant) => {
    let newCart = cart
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if(newCart[itemCode]["qty"] <= 0){
      delete newCart[itemCode]
    }
    setcart(newCart)
    saveCart(newCart)
  }

  return <>
  <Navbar key={subtotal} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} cart={cart} subtotal={subtotal} />
  <Component addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} cart={cart} subtotal={subtotal} {...pageProps} />
  <Footer/>
  </> 
}
