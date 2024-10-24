import connectDb from "@/middleware/mongoose";
import Booking from "@/models/booking";

const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
        // Create a new booking
        case 'POST':
            return await createBooking(req, res);

        // Fetch all bookings or a single booking
        case 'GET':
            if (req.query.bookingId) {
                return await getSingleBooking(req, res);
            } else {
                return await getAllBookings(req, res);
            }

        // Update a booking
        case 'PUT':
            return await updateBooking(req, res);

        // Delete a booking
        case 'DELETE':
            return await deleteBooking(req, res);

        // Method not allowed
        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

// POST: Create a new booking
const createBooking = async (req, res) => {
    const { userId, orderItems, totalAmount, shippingAddress, paymentId, receiptId } = req.body;

    try {
        const booking = new Booking({
            userId,
            orderItems,
            totalAmount,
            shippingAddress,
            paymentId,
            receiptId,
            status: 'processing',  // Default status
            paymentStatus: 'completed',  // Assuming payment is completed
        });


        // console.log(req.body)

        await booking.save();

        return res.status(201).json({ message: 'Booking created successfully', bookingId: booking._id });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ message: 'Failed to create booking', error });
    }
};

// GET: Fetch all bookings for a user
const getAllBookings = async (req, res) => {
    const { userId } = req.query;  // Assuming the userId is passed via query parameters

    try {
        const bookings = await Booking.find({ userId }).populate('orderItems.productId');

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }

        return res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return res.status(500).json({ message: 'Failed to fetch bookings', error });
    }
};

// GET: Fetch a single booking by bookingId
const getSingleBooking = async (req, res) => {
    const { bookingId } = req.query;

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.status(200).json({ booking });
    } catch (error) {
        console.error('Error fetching booking:', error);
        return res.status(500).json({ message: 'Failed to fetch booking', error });
    }
};

// PUT: Update booking status or other details
const updateBooking = async (req, res) => {
    const { bookingId } = req.query;
    const updateData = req.body;  // This can include status, shippingAddress, etc.

    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        console.error('Error updating booking:', error);
        return res.status(500).json({ message: 'Failed to update booking', error });
    }
};

// DELETE: Delete a booking
const deleteBooking = async (req, res) => {
    const { bookingId } = req.query;

    try {
        const booking = await Booking.findByIdAndDelete(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        return res.status(500).json({ message: 'Failed to delete booking', error });
    }
};

export default connectDb(handler);
