// pages/api/create-order.js
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    console.log(process.env.RAZORPAY_KEY_SECRET);

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paisa)
      currency: 'INR',
    };

    try {
      const order = await razorpay.orders.create(options);
      
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
