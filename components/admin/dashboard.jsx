import React, { useEffect, useState } from 'react';
import { FaHotel, FaSuitcase, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const [hotelsCount, sethotelsCount] = useState();
  const [packagesCount, setPackagesCount] = useState();
  const [usersCount, setUsersCount] = useState();

  const fetchhotelsCount = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/hotels/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      sethotelsCount(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const fetchPackagesCount = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setPackagesCount(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const fetchUsersCount = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setUsersCount(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {
    fetchPackagesCount();
    fetchhotelsCount();
    fetchUsersCount();
  }, []);

  return (
    <div className='flex justify-between p-20'>
      <div className='flex flex-col gap-4 items-center border border-gray-300 rounded-md py-20 px-40 hover:bg-gray-100 transition duration-300 ease-in-out'>
        <FaHotel size={50} className='text-yellow-500' />
        <span className='text-lg font-semibold'>{hotelsCount} Hotels</span>
      </div>
      <div className='flex flex-col gap-4 items-center border border-gray-300 rounded-md py-20 px-40 hover:bg-gray-100 transition duration-300 ease-in-out'>
        <FaSuitcase size={50} className='text-blue-500' />
        <span className='text-lg font-semibold'>{packagesCount} Packages</span>
      </div>
      <div className='flex flex-col gap-4 items-center border border-gray-300 rounded-md py-20 px-40 hover:bg-gray-100 transition duration-300 ease-in-out'>
        <FaUser size={50} className='text-green-500' />
        <span className='text-lg font-semibold'>{usersCount} Users</span>
      </div>
    </div>
  );
};

export default Dashboard;
