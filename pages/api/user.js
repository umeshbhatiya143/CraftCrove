import connectDb from "@/middleware/mongoose";
import User from "@/models/user";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const userId = req.query.id;
            // const fields = req.query.fields; // Access fields from query parameters

            // console.log(req.query)
            // Convert fields query to an object suitable for MongoDB projection
            // const fieldsQuery = fields.split(',').reduce((acc, field) => {
            //     acc[field] = 1; // Set each field you want to retrieve as 1
            //     return acc;
            // }, {});

            const user = await User.findById(userId); // Use MongoDB's projection to select fields
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
    else if (req.method === 'PATCH') {
        try {
            const userId = req.query.id;
            console.log('User ID:', userId);
    
            // Check if the user ID is present and valid
            // if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            //     return res.status(400).send({ message: 'Invalid user ID' });
            // }
    
            // // Log the user ID for debugging purposes
            // console.log('User ID:', userId);
    
            // // Find and update the user
            const user = await User.findByIdAndUpdate(userId, req.body);
    
            // // If no user is found, send a 404 response
            if (!user) {
                return res.status(404).send({user});
            }
    
            // // Send a success response
            res.status(200).send({ message: 'User details updated successfully' });
        } catch (err) {
            // Log the error and send a 500 response
            console.error('Error updating user:', err);
            res.status(500).send({ message: 'Internal server error', error: err.message });
        }
    }
    else {
        res.status(200).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)