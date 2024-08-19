const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      },
      password: {
        type: String,
        required: true
      },
      gender: {
        type: String
      },
      mobileNo: {
        type: Number
      },
      country: {
        type: String,
      },
      pincode: {
        type: String
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      address: {
        type: String,
      },
      profilePicture: {
        type: String,
      },
      walletId: {
        type: String
      },
      cart: [{
        // type: mongoose.Schema.Types.ObjectId,
    
        productId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
          type: Number
        }
      }],
      bookings: [{
        type: mongoose.Schema.Types.ObjectId,
      }]
  
}, {timestmps:true} )

mongoose.models = {}

export default mongoose.model("user", UserSchema)