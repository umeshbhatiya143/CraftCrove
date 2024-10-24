import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentId, orderId, signature } = req.body;

    // Generate a signature using the same method as Razorpay
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET) // Use your key secret here
      .update(orderId + '|' + paymentId) // Razorpay requires order_id + '|' + payment_id
      .digest('hex');

    // Compare the generated signature with the one received from Razorpay
    if (generatedSignature === signature) {
      // Signature matches, the payment is valid
      res.status(200).json({ success: true });
    } else {
      // Signature doesn't match, the payment is invalid
      res.status(400).json({ success: false, message: 'Signature mismatch' });
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}
