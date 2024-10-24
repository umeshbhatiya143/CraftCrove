import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Loading Icon

const OrderSuccess = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            const fetchOrderDetails = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/booking?bookingId=${orderId}`);
                    const data = await response.json();
                    if (response.ok) {
                        setOrderDetails(data.booking);
                    } else {
                        console.error('Failed to fetch order details:', data.message);
                    }
                } catch (error) {
                    console.error('Error fetching order details:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchOrderDetails();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <AiOutlineLoading3Quarters className="text-4xl text-green-500 animate-spin" />
            </div>
        );
    }

    if (!orderDetails) {
        return <div className="text-center text-red-500 text-lg">Order not found!</div>;
    }

    const { orderItems, totalAmount, paymentId, shippingAddress, status } = orderDetails;

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 lg:px-0 bg-white shadow-lg rounded-lg mt-12">
            {/* Success Message */}
            <div className="text-center mb-8">
                <FaCheckCircle className="h-12 w-12 text-green-500 animate-bounce mx-auto" />
                <h1 className="text-3xl font-semibold text-green-600 mt-4">
                    Thank You! Your Order was Successful
                </h1>
            </div>

            {/* Order Summary Section */}
            <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-8 animate-fadeIn">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                    <p><strong>Order ID:</strong> {orderId}</p>
                    <p><strong>Payment ID:</strong> {paymentId}</p>
                    <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
                    <p><strong>Status:</strong> 
                        <span className={`font-bold ${status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {status}
                        </span>
                    </p>
                </div>
            </div>

            {/* Shipping Address Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 animate-fadeInDelay">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Address</h2>
                <p className="text-gray-600 mb-1"><strong>Address:</strong> {shippingAddress.address}</p>
                <p className="text-gray-600 mb-1">
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}
                </p>
                <p className="text-gray-600"><strong>Country:</strong> {shippingAddress.country}</p>
            </div>

            {/* Order Items Section */}
            <div className="bg-white shadow-md rounded-lg p-6 animate-fadeInDelay">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Items</h2>
                <ul className="divide-y divide-gray-200">
                    {orderItems.map((item, index) => (
                        <li
                            key={index}
                            className="py-4 flex justify-between items-center"
                        >
                            <div className="flex flex-col">
                                <p className="font-medium text-gray-800">{item.productId}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                            </div>
                            <div className="font-semibold text-lg text-gray-800">
                                ₹{item.price * item.quantity}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Continue Shopping Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => router.push('/')}
                    className="bg-green-500 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-green-600 transition duration-300 ease-in-out hover:scale-105"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
