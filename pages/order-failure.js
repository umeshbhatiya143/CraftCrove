import { useRouter } from 'next/router';
import { FaExclamationTriangle } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai'; // Reload Icon

const OrderFailure = () => {
    const router = useRouter();
    const { orderId } = router.query;

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 lg:px-0 bg-white shadow-lg rounded-lg mt-12">
            {/* Error Message */}
            <div className="text-center mb-8">
                <FaExclamationTriangle className="h-12 w-12 text-red-500 mx-auto" />
                <h1 className="text-3xl font-semibold text-red-600 mt-4">
                    Order Failed
                </h1>
                <p className="text-lg text-gray-700 mt-2">
                    Unfortunately, your order with ID <strong>{orderId}</strong> could not be processed.
                </p>
            </div>

            {/* Retry Section */}
            <div className="bg-red-100 border border-red-300 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-red-700 mb-4">What Happened?</h2>
                <p className="text-gray-700 mb-4">
                    There was an issue processing your payment or completing your order. This can happen for several reasons, such as network issues, insufficient funds, or incorrect payment details.
                </p>
                <p className="text-gray-700 mb-4">
                    Please check your payment information and try again.
                </p>
            </div>

            {/* Reload or Help Section */}
            <div className="flex flex-col items-center">
                {/* <button
                    onClick={() => router.reload()}
                    className="bg-red-500 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-red-600 transition duration-300 ease-in-out hover:scale-105 mb-4"
                >
                    Retry Payment
                </button> */}
                <button
                    onClick={() => router.push('/contact')}
                    className="bg-gray-500 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
                >
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default OrderFailure;
