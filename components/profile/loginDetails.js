import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/assets/loader.gif'
import Image from 'next/image';
import { jwtDecode } from 'jwt-decode';

const LoginDetails = () => {
    // const user = useSelector(state => state.auth.userData);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isPassEditing, setIsPassEditing] = useState(false);
    const [userId, setUserId] = useState()
    const [loginData, setLoginData] = useState({
        email: '',
        mobileNo: '',
    });
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({ ...prevState, [name]: value }));
    };

    const fetchLoginData = async (userId) => {
            try {
              // Construct URL with query parameters
              console.log(userId)
              const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/api/user?id=${userId}`);
              // const params = { fields: 'name,profilePicture,gender,dob,pincode,state,country,address' }; // Define fields you want to fetch
              // url.search = new URLSearchParams(params).toString();
        
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
        
              console.log(data)
        
              setLoginData(prevData => ({
                ...prevData,
                email: data.user.email,
                mobileNo: data.user.mobileNo,
              }));
        
            } catch (error) {
              console.error('Failed to fetch user data:', error);
            }
          };
        
    

    const updateLoginDetails = async () => {
        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user?id=${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
            if (!response.ok) throw new Error('Failed to update login details');
            toast.success('Login details updated successfully');
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to update login details', toastOptions);
        } finally {
            setIsLoading(false)
            setIsEditing(false);
            fetchLoginData();
        }
    };


    const updatePasswordDetails = async () => {
        const updatedPass = {
            ...passwords,
            userId: user.userId
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/change-password`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPass),
            });
            if (!response.ok) throw new Error('Failed to update login details');
            toast.success('Login details updated successfully', toastOptions);
        } catch (error) {
            console.error(error.message);
            toast.error(error.message || 'Failed to update login details', toastOptions);
        } finally {
            setIsLoading(false)
            setIsEditing(false);
            fetchLoginData();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
          const decodedToken = jwtDecode(token);
          // console.log(decodedToken.id)
          setUserId(decodedToken.id);
          fetchLoginData(decodedToken.id);
        }
      }, [])


    return (
        <div className="w-full mx-auto rounded-lg">
            <div className="p-4 bg-gray-100 rounded-md shadow-xl">
                <div className="mb-4">
                    <label className="text-dark-cyan font-bold mb-1 capitalize">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={`w-full p-2 rounded-md border ${isEditing ? 'border-dark-cyan focus:ring-dark-cyan' : 'border-gray-300'} transition-colors`}
                        style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-dark-cyan font-bold mb-1 capitalize">Mobile No:</label>
                    <input
                        type="mobile"
                        name="mobileNo"
                        value={loginData.mobileNo}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={`w-full p-2 rounded-md border ${isEditing ? 'border-dark-cyan focus:ring-dark-cyan' : 'border-gray-300'} transition-colors`}
                        style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
                    />
                </div>
                <div className="flex justify-between mt-4">
                    {isEditing && !isLoading ? (
                        <>
                            <button
                                onClick={updateLoginDetails}
                                className="bg-pink-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </>
                    ) : !isLoading ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-gray-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            Edit
                        </button>
                    )
                        :
                        (
                            <div className="w-20 h-20 relative">
                                <Image src={Loader} alt="Loading..." layout="fill" objectFit="cover" />
                            </div>
                        )}
                </div>
            </div>

            {/* Password Change Section */}
            <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-xl">
                {Object.entries(passwords).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="text-dark-cyan font-bold mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
                        <input
                            type="password"
                            name={key}
                            value={value}
                            placeholder='******'
                            onChange={handlePasswordChange}
                            readOnly={!isPassEditing}
                            className={`w-full p-2 rounded-md border ${isPassEditing ? 'border-dark-cyan focus:ring-dark-cyan' : 'border-gray-300'} transition-colors`}
                            style={{ backgroundColor: isPassEditing ? '#FFFFFF' : '#F9FAFB' }}
                        />
                    </div>
                ))}
                {passwords.newPassword !== passwords.confirmPassword && <p style={{ color: 'red' }}>*password and confirm password not matched</p>}
                <div className="flex justify-between mt-4">
                    {isPassEditing ? (
                        <>
                            <button
                                onClick={updatePasswordDetails}
                                className="bg-pink-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setIsPassEditing(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsPassEditing(true)}
                            className="bg-gray-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            Change Password
                        </button>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginDetails;
