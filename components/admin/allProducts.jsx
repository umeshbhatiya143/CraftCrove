import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from '@/assets/loader.gif'
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const AllPackages = () => {

  const [title, setTitle] = useState('')
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [allTitles, setAllTitles] = useState([])
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [packages, setPackages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isNoMore, setIsNoMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  // ----------filters-----------
  const [filters, setFilters] = useState({
    categories: {
      Honeymoon: false,
      Family: false,
    },
    duration: {
      '2-3': false,
      '4-5': false,
      '6-7': false,
      '7+': false,
    },
    budgetPerPerson: {
      'Less Than 10000': false,
      '10000-20000': false,
      '20000-40000': false,
      '40000-60000': false,
      '60000-80000': false,
      'Above 80000': false
    },
    hotelStarRating: {
      '5 Star': false,
      '4 Star': false,
      '3 Star': false,
      '2 Star': false
    },
    // activities: {
    //   'Adventure': false,
    //   'Nature': false,
    //   'Hill Station': false,
    //   'Religious': false,
    //   'Water Activities': false
    // },
    // destinations: Object.fromEntries(
    //   cities.map(city => [city, false])
    // ),
    inclusions: {
      'Sightseeing': false,
      'Breakfast': false,
      'Transfers': false,
      'Meals': false,
      'Airport Pickup-Drop': false,
      'Private Cab': false,
      'Cruise': false,
      'Houseboat': false,
      'Adventure Activity': false,
      'Safari': false,
      'Flights': false,
    }
  });

  // Function to handle package deletion
  const handleDeletePackage = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data.packages)
      if (response.ok) {
        fetchPackages()
      }
      // return data.packages
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  const fetchAllTitles = async () => {
    try {
      // const queryParams = new URLSearchParams(filter).toString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/titles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setAllTitles(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  }

  useEffect(() => {
    fetchAllTitles()
  }, [])

  const handleTitleChange = (event) => {
    const input = event.target.value;
    setTitle(input);

    if (input) {
      const matchedTitles = allTitles.filter((title) =>
        title.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredTitles(matchedTitles);
      setIsDropdownVisible(true);
    } else {
      setFilteredTitles([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // const queryParams = new URLSearchParams(filter).toString();
      const searchQuery = {
        title: title,
        destination: "",
        month: ""
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages?limit=10&page=${currentPage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery, filters }),
      });
      const data = await response.json();
      if (data.packages.length === 0) {
        setIsNoMore(true);
      }
      setPackages(data.packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchPackages = async (page) => {
    setIsLoading(true);
    try {
      const searchQuery = {
        title: title,
        destination: "",
        month: ""
      }
      // const queryParams = new URLSearchParams(filter).toString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getAllProducts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters, searchQuery }),
      });
      const data = await response.json();
      if (data.packages.length === 0) {
        setIsNoMore(true);
      }
      setPackages(data.packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchPackages(currentPage);

  }, [currentPage]);


  return (
    <div className='w-full flex flex-col items-center px-10 pb-20'>
      {/* <h2 className='font-bold text-2xl text-center pb-4'>All Packages</h2> */}

      <div className="bg-gray-200 mt-4 mb-6 rounded-lg  shadow-md p-4 flex w-full max-w-2xl">
        {/* Destination Input */}
        <div className="flex-grow relative">
          <input
            type="text"
            className="w-full p-2 rounded-l-md"
            placeholder="Enter destination"
            value={title}
            onChange={handleTitleChange}
          />
          {isDropdownVisible && (
            <div className="absolute left-0 right-0 top-full bg-white border border-t-0 rounded-b-md shadow-lg max-h-60 overflow-auto z-10">
              {filteredTitles.map((title) => (
                <div
                  key={title}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setTitle(title);
                    setIsDropdownVisible(false);
                  }}
                >
                  {title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Explore Button */}
        <button className="bg-button-color transition-all duration-1000 hover:bg-button-color-hover text-white font-bold py-2 px-4 rounded-md ml-2"
          onClick={handleSearch}>
          Explore
        </button>
      </div>

      <div className='w-full'>
        {packages.map(pkg => (
          <div key={pkg.id} className="border border-gray-300 rounded p-4 mb-4">
            <h3 className="font-semibold">{pkg.title}</h3>
            <p>Price: <span>&#8377;</span>{pkg.price}</p>
            <p>Duration: {pkg.duration}</p>

            <div className="flex justify-end">
              {/* <button className="bg-green-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">View</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">Update</button> */}
              <button onClick={() => handleDeletePackage(pkg._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 && <span className='text-black text-center mt-2'>Nothing to show...</span>}
      {isNoMore && packages.length > 0 && <span className='text-black text-center mt-2'>No more content...</span>}
      {isLoading && <div className="flex items-center w-24 h-24 relative">
        <Image
          alt='loader'
          src={Loader}
          width={100}
          height={100}
        />
        Loading...
      </div>}

      {/* navigation buttons */}
      {/* <div className='mt-10 flex gap-6'>
        <button
          onClick={() => prevPage()}
          disabled={currentPage === 1}
          className={`flex justify-center items-center gap-2 hover:bg-deep-purple rounded-full px-3 text-dark-cyan hover:text-white transition-all duration-700 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
     
          prev
        </button>
        <span className='border rounded-full border-2 border-deep-purple flex justify-center items-center w-7 h-7'>{currentPage}</span>
        <button
          disabled={isNoMore === true}
          onClick={() => nextPage()}
          className={`flex justify-center items-center gap-2 hover:bg-deep-purple rounded-full px-3 text-dark-cyan hover:text-white transition-all duration-700 ${isNoMore === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}>next<FaArrowRightLong />
        </button>
      </div> */}
    </div>
  );
};

export default AllPackages;
