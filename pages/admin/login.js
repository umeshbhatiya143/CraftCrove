import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '@/assets/loader.gif'
import { useRouter } from 'next/router';
import Image from 'next/image';

import { jwtDecode } from 'jwt-decode';

const AdminLogin = () => {
    const router = useRouter()

    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false)

    // toastify
    const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to log in');
            }

            toast.success('You are successfully logged in');
            localStorage.setItem("adminLogin", true);
            if(values.email==="umesh@admin.com"){
                router.push('/admin')
            }
        } catch (error) {
            console.error('Login error:', error.message);
            toast.error(error.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="p-8 bg-white rounded shadow-md">
                <h2 className="text-lg text-deep-purple font-semibold text-center mb-4">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    {isLoading === false ?
                        <button type="submit" className="bg-button-color border-none rounded-lg p-3.5 text-white w-full transition-all duration-300 hover:bg-button-color-hover cursor-pointer">
                            Login
                        </button> :
                        <div className="w-20 h-20 relative">
                            <Image src={Loader} alt="loader" layout="fill" objectFit="contain" />
                        </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
