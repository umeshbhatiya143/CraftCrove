import connectDb from "@/middleware/mongoose";
import User from "@/models/user";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const userId = req.query.id;
        const newAddress = req.body; // New address object coming from the request body

        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { savedAddresses: newAddress } },
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            res.status(201).send({ message: 'Address added successfully', user });
        } catch (err) {
            console.error('Error adding address:', err);
            res.status(500).send({ message: 'Internal server error', error: err.message });
        }
    }
    else if (req.method === 'PATCH') {
        const { userId, addressId } = req.query;
        const updatedAddress = req.body; // Updated address object coming from the request body

        try {
            const user = await User.findOneAndUpdate(
                { _id: userId, 'savedAddresses._id': addressId },
                { $set: { 'savedAddresses.$': updatedAddress } },
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).send({ message: 'User or address not found' });
            }

            res.status(200).send({ message: 'Address updated successfully', user });
        } catch (err) {
            console.error('Error updating address:', err);
            res.status(500).send({ message: 'Internal server error', error: err.message });
        }
    }
    else if (req.method === 'DELETE') {
        const { userId, addressId } = req.query;

        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $pull: { savedAddresses: { _id: addressId } } },
                { new: true }
            );

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            res.status(200).send({ message: 'Address deleted successfully', user });
        } catch (err) {
            console.error('Error deleting address:', err);
            res.status(500).send({ message: 'Internal server error', error: err.message });
        }
    }
    else {
        res.status(200).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)