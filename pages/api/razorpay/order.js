import Razorpay from 'razorpay';

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Set your Razorpay key here
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Set your Razorpay secret here
});

const receiptId = `order_rcptid_${Date.now()}`; 

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { amount, currency, receipt } = req.body; // Data passed from frontend (amount in smallest units)
        const options = {
            amount, // amount in smallest currency unit (e.g., paise for INR)
            currency,
            receipt
        };

        // console.log(options)

        try {
            const order = await razorpayInstance.orders.create(options); // Create order
            res.status(200).json(order);
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
