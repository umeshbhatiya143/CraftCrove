import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DynamicPageLoader from '@/components/profile/DynamicPageLoader';
import { IoIosArrowForward } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
// import { useSelector, useDispatch } from 'react-redux'
// import { toggleLogin, loginUser, logoutUser } from '@/store/slices';

const Dashboard = () => {
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [selectedPage, setSelectedPage] = useState('personalInfo');
  const [balance, setBalance] = useState(500); // Initial balance
  const router = useRouter();
  // const dispatch = useDispatch()
  const { id } = router.query;

  const handleDeposit = () => {
    setBalance(prevBalance => prevBalance + 100);
  };

  const handleWithdraw = () => {
    if (balance >= 100) {
      setBalance(prevBalance => prevBalance - 100);
    } else {
      alert("Insufficient funds!");
    }
  };

  const handleFieldClick = (page) => {
    setSelectedPage(page);
    router.push(`/profile/${page}`);
  };

  const formatPageName = (pageName) => {
    return pageName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  // useEffect(()=> {
  //   if(isLoggedIn === false){
  //     router.push('/')
  //   }
  // })

  return (
    <section className='w-full h-[85vh] flex justify-center overflow-hidden'>
      <div className="w-[70%] flex flex-col py-10 gap-6">
        <div className='flex justify-between items-center gap-4 text-pink-500'>
          <div className='flex items-center gap-4'>
            <div className='w-60 text-center font-bold border border-dark-cyan rounded-md py-2 px-4'>Dashboard</div>
            <IoIosArrowForward className="text-pink-500" />
            <span className="font-bold">{formatPageName(selectedPage)}</span>
          </div>
         
          {/* <div className="flex items-center">
            <h2 className="text-2xl font-bold">Balance: </h2>
            <p className="text-lg ml-2"><span>&#8377;</span>{balance.toFixed(2)}</p>
          </div> */}
        </div>

        <div className='flex w-full gap-8'>
          <ul className='flex flex-col gap-4 bg-gray-100 rounded-md shadow-xl w-60 h-fit py-4'>
            {['personalInfo', 'loginDetails', 'bookingDetails'].map((page) => (
              <li
                key={page}
                className={`w-full cursor-pointer rounded-md py-3 px-4 font-bold text-gray-700 ${selectedPage === page ? 'bg-pink-500 text-white border-l-[5px] border-blue-600' : 'hover:bg-gray-300'} transition-colors duration-300`}
                onClick={() => handleFieldClick(page)}
              >
                {formatPageName(page)}
              </li>
            ))}
            {/* <li
                className={`w-full cursor-pointer rounded-md py-3 px-4 font-bold text-gray-700 transition-colors duration-300`}
                onClick={()=> router.push('/Cart')}
              >
                Wishlist
              </li> */}
            <li
              className="cursor-pointer text-red-600 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300 flex items-center"
              onClick={() => {
                // dispatch(logoutUser())
                // window.location.reload()
              }}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </li>
          </ul>

          <div className="flex-grow h-[90vh] overflow-y-scroll pb-40" style={{ scrollbarWidth: "none" }}>
            {selectedPage && (
              <DynamicPageLoader page={selectedPage}/>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

