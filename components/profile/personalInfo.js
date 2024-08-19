import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BiPencil, BiTrash, BiSave } from "react-icons/bi"; // Adding BiSave for save icon
import { FaUserCircle } from "react-icons/fa";
// import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/assets/loader.gif'
import { jwtDecode } from 'jwt-decode';

const PersonalInfo = () => {
  // const user = useSelector(state => state.auth.userData);
  // const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState()
  const [userData, setUserData] = useState({
    name: "",
    profilePicture: "",
    gender: "",
    dob: "",
    pincode: "",
    state: "",
    country: "",
    address: ""
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  // useEffect(()=> {
  //   console.log(userData)
  // },[userData])

  const fetchUserData = async (userId) => {

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

      setUserData(prevData => ({
        ...prevData,
        name: data.user.name,
        profilePicture: data.user.profilePicture,
        gender: data.user.gender,
        dob: data.user.dob,
        pincode: data.user.pincode,
        state: data.user.state,
        country: data.user.country,
        address: data.user.address
      }));

    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken.id)
      setUserId(decodedToken.id);
      fetchUserData(decodedToken.id);
    }
  }, [])

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpdate = () => {
    return new Promise(async (resolve, reject) => {
      if (!selectedFile) {
        resolve();
        return;
      }
      const formData = new FormData();
      formData.append('photo', selectedFile);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/images/upload-image`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Failed to upload image');
        const { imageUrl } = await response.json();
        resolve(imageUrl);  // Resolve the promise with the new image URL
      } catch (error) {
        console.error(error.message);
        toast.error('Error uploading image', toastOptions);
        reject(error);
      }
    });
  };

  const updateUserProfile = async () => {
    setIsLoading(true)

    // const imageUrl = await handleImageUpdate();

    const updatedData = {
      ...userData,
      // profilePicture: imageUrl
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user?id=${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = response.json();
      toast.success('Profile updated successfully', toastOptions);
      fetchUserData(userId)
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to update profile', toastOptions);
    } finally {
      setIsLoading(false)
      setIsEditing(false);
      fetchUserData();
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const removeProfilePicture = () => {
    console.log('Profile picture removal logic here');
    // Logic to remove the profile picture from Cloudinary and update database
  };

  return (
    <div className="w-full bg-gray-100 p-6 rounded-lg shadow-xl transition-shadow duration-500">
      <div className='flex justify-between items-center bg-gradient-to-r from-gray-400 to-pink-500 p-4 rounded-lg text-white'>
        <div className="text-center">
          {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-sm" />}
          {!userData.profilePicture && <FaUserCircle className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-sm" />}
          {isEditing && (
            <div className="flex justify-center mt-3 space-x-2">
              <label htmlFor="photo" className="cursor-pointer p-2 rounded-full text-lg bg-gray-400 hover:bg-pink-500 transition-colors">
                <BiPencil />
                <input type="file" id='photo' name='photo' className='hidden' onChange={handleFileChange} />
              </label>
              <button onClick={removeProfilePicture} className="p-2 rounded-full bg-gray-400 hover:bg-pink-500 transition-colors">
                <BiTrash />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {!isLoading && (
            <button
              onClick={toggleEdit}
              className={`py-2 px-4 rounded-full font-semibold transition-colors duration-300 ${isEditing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-400 hover:bg-pink-500'}`}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          )}
          {isEditing && !isLoading ? (
            <button
              onClick={updateUserProfile}
              className="py-2 px-4 bg-pink-500 hover:bg-gray-400 rounded-full text-white font-semibold transition-colors duration-300"
            >
              <BiSave className="inline mr-2" />
              Save
            </button>
          ) : isLoading ? (
            <div className="w-20 h-20 relative">
              <Image src={Loader} alt="Loading..." layout="fill" objectFit="cover" />
            </div>
          ) : null}
        </div>
      </div>

      <form className="mt-4 space-y-4">
        <div className="flex items-center">
          <label className="w-1/4 text-gray-600 text-sm font-semibold capitalize">Full Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`flex-grow p-2 rounded-lg border-2 ${isEditing ? 'border-pink-500 focus:ring-2 focus:ring-pink-500' : 'border-gray-200'} transition-colors`}
            style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 text-gray-600 text-sm font-semibold capitalize">Gender:</label>
          <select className={`flex-grow p-2 rounded-lg border-2 ${isEditing ? 'border-pink-500 focus:ring-2 focus:ring-pink-500' : 'border-gray-200'} transition-colors`}
            style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
            onChange={handleInputChange}
            value={userData.gender}
            disabled={!isEditing}
            name='gender'>
            <option value="">select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-1/4 text-gray-600 text-sm font-semibold capitalize">DOB:</label>
          <input
            type='date'
            name="dob"
            value={userData.dob}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`flex-grow p-2 rounded-lg border-2 ${isEditing ? 'border-pink-500 focus:ring-2 focus:ring-pink-500' : 'border-gray-200'} transition-colors`}
            style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 text-gray-600 text-sm font-semibold capitalize">Pincode:</label>
          <input
            type="number"
            name="pincode"
            value={userData.pincode}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`flex-grow p-2 rounded-lg border-2 ${isEditing ? 'border-pink-500 focus:ring-2 focus:ring-pink-500' : 'border-gray-200'} transition-colors`}
            style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 text-gray-600 text-sm font-semibold capitalize">State:</label>
          <input
            type="text"
            name="state"
            value={userData.state}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`flex-grow p-2 rounded-lg border-2 ${isEditing ? 'border-pink-500 focus:ring-2 focus:ring-pink-500' : 'border-gray-200'} transition-colors`}
            style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 text-gray-600 text-sm font-semibold capitalize">Country:</label>
          <input
            type="text"
            name="country"
            value={userData.country}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`flex-grow p-2 rounded-lg border-2 ${isEditing ? 'border-pink-500 focus:ring-2 focus:ring-pink-500' : 'border-gray-200'} transition-colors`}
            style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/4 text-gray-600 text-sm font-semibold capitalize">Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`flex-grow p-2 rounded-lg border-2 ${isEditing ? 'border-pink-500 focus:ring-2 focus:ring-pink-500' : 'border-gray-200'} transition-colors`}
            style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PersonalInfo;
