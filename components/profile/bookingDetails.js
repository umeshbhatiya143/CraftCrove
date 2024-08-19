import React, { useEffect, useState } from 'react';
import { FaSearch, FaRegSadTear } from 'react-icons/fa';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
// import { useSelector, useDispatch } from 'react-redux'
import BookingDetail from './bookingDetailCompo';

const BookingDetails = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [searchQuery, setSearchQuery] = useState('');
    // const userData = useSelector(state => state.auth.userData);
    const [bookings, setBookings] = useState()

    const bookingData = {
        upcoming: [],
        cancelled: [],
        completed: [],
    };

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Search for:', searchQuery);
    };

    const fetchBookingDetails = async (bookingId) => {
        try {
            // Construct URL with query parameters

            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/bookings/${bookingId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            return data

        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }

    const fetchBookings = async () => {
        const bookings = await Promise.all(
            userData.bookings.map((bookingId) => {
                return fetchBookingDetails(bookingId);
            })
        );
        setBookings(bookings);
    };

    useEffect(() => {
        fetchBookings()
    }, [])

    const renderNoBookingsMessage = () => (
        <div className="flex flex-col items-center justify-center py-10">
            <FaRegSadTear className="text-6xl text-dark-cyan" />
            <span className="text-lg text-dark-cyan mt-4">
                Currently, you have no bookings.
            </span>
        </div>
    );

    const renderTabContent = (tab) => {
        const filteredBookings = bookings ? bookings.filter(booking => booking.journeyStatus === tab) : [];

        return filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
                <BookingDetail key={index} travelersDetail={booking.TravelersDetail} bookingStatus={booking.bookingStatus} journeyStatus={booking.journeyStatus} totalPrice={booking.totalPrice} packageTitle={booking.packageTitle} paymentDetails={booking.paymentDetails} packageId={booking.package} />
            ))
        ) : (
            renderNoBookingsMessage()
        );
    };

    return (
        <div className="w-full rounded-md mx-auto bg-gray-100 p-6">
            <div className="mb-4">
                <form
                    className="flex items-center bg-custom-white rounded shadow"
                    onSubmit={handleSearchSubmit}
                >
                    <FaSearch className="text-lg text-dark-cyan mx-3" />
                    <input
                        className="py-2 px-4 w-full rounded-l outline-none"
                        type="text"
                        placeholder="Search for a booking"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button
                        className="bg-deep-purple text-custom-white py-2 px-6 rounded-r"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </div>

            <div className="flex justify-center mb-6">
                {Object.keys(bookingData).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 mx-1 transform hover:-translate-y-1 shadow ${activeTab === tab
                            ? 'bg-deep-purple text-custom-white'
                            : 'text-dark-cyan bg-custom-white hover:bg-dark-cyan hover:text-custom-white'
                            }`}
                    >
                        {activeTab === tab && (
                            <BsFillCalendarCheckFill className="text-white mr-2" />
                        )}
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                    </button>
                ))}
            </div>

            <div className="p-4 rounded">
                {activeTab && renderTabContent(activeTab)}

            </div>

            <div className="mt-6 text-center text-dark-cyan bg-yellow-200 p-2 rounded">
                Check here for the latest COVID-19 travel info
            </div>
        </div>
    );
};

export default BookingDetails;
