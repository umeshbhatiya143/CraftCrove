import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useState, useEffect } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subtotal, setSubtotal] = useState(0)
  const router = useRouter()
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        saveCart(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      toast.error("Failed to load cart. Please try again.", toastOptions);
      localStorage.removeItem("cart");
    }

    try {
      const token = localStorage.getItem("token");
      if (token) {
        setUser({ value: token });
        setKey(Math.random());
      }
    } catch (error) {
      console.error("Error fetching token from localStorage:", error);
      toast.error("Failed to fetch user session. Please log in again.", toastOptions);
    }
  }, [router.query]);

  useEffect(() => {
    const handleRouteChangeStart = () => setProgress(40);
    const handleRouteChangeComplete = () => setProgress(100);
    
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  const toastOptions = {
    position: "top-left",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setUser({ value: null });
      setKey(Math.random());
      toast.success('You are successfully logged out', toastOptions);
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.", toastOptions);
    }
  }

  const saveCart = (myCart) => {
    try {
      localStorage.setItem("cart", JSON.stringify(myCart));
      let subt = 0;
      let keys = Object.keys(myCart);
      for (let i = 0; i < keys.length; i++) {
        subt += myCart[keys[i]].price * myCart[keys[i]].qty;
      }
      setSubtotal(subt);
    } catch (error) {
      console.error("Error saving cart:", error);
      toast.error("Failed to save cart. Please try again.", toastOptions);
    }
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    try {
      let newCart = { ...cart };
      if (itemCode in cart) {
        newCart[itemCode].qty += qty;
      } else {
        newCart[itemCode] = { qty, price, name, size, variant };
      }
      setCart(newCart);
      saveCart(newCart);
      toast.success('Item added successfully to the cart', toastOptions);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.", toastOptions);
    }
  }

  const clearCart = () => {
    try {
      setCart({});
      saveCart({});
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart. Please try again.", toastOptions);
    }
  }

  const removeFromCart = (itemCode, qty) => {
    try {
      let newCart = { ...cart };
      if (itemCode in cart) {
        newCart[itemCode].qty -= qty;
        if (newCart[itemCode].qty <= 0) {
          delete newCart[itemCode];
        }
      }
      setCart(newCart);
      saveCart(newCart);
      toast.success('Item removed successfully from the cart', toastOptions);
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart. Please try again.", toastOptions);
    }
  }

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    try {
      const newCart = { [itemCode]: { qty: 1, price, name, size, variant } };
      saveCart(newCart);
      setCart(newCart);
      router.push('/checkout');
    } catch (error) {
      console.error("Error during buy now:", error);
      toast.error("Failed to proceed with purchase. Please try again.", toastOptions);
    }
  }

  return (
    <>
      <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      <Navbar
        logout={logout}
        user={user}
        key={key}
        addToCart={addToCart}
        clearCart={clearCart}
        removeFromCart={removeFromCart}
        cart={cart}
        subtotal={subtotal}
      />
      <div className='pt-16'>
        <Component
          buyNow={buyNow}
          addToCart={addToCart}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
          cart={cart}
          subtotal={subtotal}
          {...pageProps} />
      </div>
      <Footer />
    </>
  )
}
