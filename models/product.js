const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {type: String, required:true},
    slug: {type: String, required:true, unique:true},
    desc: {type: String, required:true},
    img: {type: String, required:true},
    category: {type: String, required:true},
    size: {type: String},
    color: {type:String},
    price: {type: Number, required:true},
    availableQty: {type: Number, required:true},
    discount: {type: Number},
    rating: {type: Number}, // rating out of 5
    reviewCount: {type: Number}, // total number of reviews
    seller:{type: String, required:true}
   
}, {timestmps:true} )

mongoose.models = {}

export default mongoose.model("product", ProductSchema)