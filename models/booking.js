const mongoose = require('mongoose');

// Define schema for package booking details
const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package', // Reference to the Package collection
        required: true
    },
    packageTitle: {
        type: String,
        required:true
    },
    startDate: {
        type: Date,
        // required: true
    },
    endDate: {
        type: Date,
        // required: true
    },
    numberOfTravellers: {
        type: Number,
        required: true
    },
    TravelersDetail: [
        {
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            dob: {
                type: Date
            },
            gender: {
                type: String
            },
            aadhaarNumber: {
                type: String
            }
        }
    ],
    journeyStatus: {
        type: String,
        enum: ['upcoming', 'completed', 'cancelled'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    gst: {
        type: Number,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentDetails: {
        orderId: {
            type: String
        },
        paymentId: {
            type: String
        },
        paymentMethod: {
            type: String
        }
    },

}, { timestamps: true });

// Define PackageBooking model
const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
