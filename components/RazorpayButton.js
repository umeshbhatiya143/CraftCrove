import React from 'react';
import { useRouter } from 'next/router';

const RazorpayButton = ({ amount, userId, orderItems, shippingAddress }) => {
    const receiptId = `order_rcptid_${Date.now()}`;
    const router = useRouter();

    const loadRazorpay = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => {
            alert('Razorpay SDK failed to load. Are you online?');
        };
        script.onload = async () => {
            try {
                const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/razorpay/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: Math.round(amount * 100), // Convert to smallest unit (paise for INR)
                        currency: 'INR',
                        receipt: receiptId,
                    })
                });

                const order = await result.json();

                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use your Razorpay Key ID here
                    amount: order.amount, // Amount in paise
                    currency: order.currency,
                    name: 'Craftcrove',
                    description: 'Order Payment',
                    order_id: order.id,
                    handler: async function (response) {
                        // Handle successful payment here
                        const paymentId = response.razorpay_payment_id;
                        const orderId = response.razorpay_order_id;
                        const signature = response.razorpay_signature;

                        // alert(`Payment Successful with Payment ID: ${paymentId}`);

                        // Send payment details to the server for verification
                        const validateResult = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/razorpay/validate`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                paymentId,
                                orderId,
                                signature,
                            }),
                        });

                        const validationData = await validateResult.json();
                        if (validationData.success) {
                            // Payment verified, now create the booking
                            const bookingResult = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/booking`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userId,                   // Pass the current user ID
                                    orderItems,               // Pass the order items for the booking
                                    totalAmount: amount,      // Total amount paid
                                    shippingAddress,          // Shipping address provided by the user
                                    paymentId,                // Razorpay payment ID
                                    receiptId,                // Razorpay receipt ID
                                }),
                            });

                            const bookingData = await bookingResult.json();

                            // console.log(bookingData)
                            if (bookingResult.ok) {
                                // alert('Booking created successfully!');
                                // Redirect to success page or show confirmation
                                router.push(`/order-success?orderId=${bookingData.bookingId}`);

                            } else {
                                // alert('Failed to create booking.');
                                router.push(`/order-failure?orderId=${orderId}`);
                            }
                        } else {
                            alert('Payment verification failed!');
                        }
                    },
                    prefill: {
                        name: 'John Doe',
                        email: 'john@example.com',
                        contact: '9999999999',
                    },
                    notes: {
                        address: 'Some address',
                    },
                    theme: {
                        color: '#F37254',
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (err) {
                console.error('Error during payment initialization:', err);
                alert('Failed to initialize Razorpay payment.');
            }
        };
        document.body.appendChild(script);
    };

    console.log(orderItems)

    return (
        <button
            onClick={loadRazorpay}
            className={`mt-4 w-full bg-pink-500 text-white font-semibold py-2 rounded-md shadow hover:bg-pink-600 transition duration-200 ${shippingAddress.address === undefined ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={shippingAddress.address === undefined}  // Disable the button if selectedAddress is empty
        >
            Pay ₹{amount}
        </button>

    );
};

export default RazorpayButton;
