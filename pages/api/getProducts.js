import connectDb from "@/middleware/mongoose";
import product from "@/models/product";

const handler = async (req,res)=>{
    let products = product.find()
    
    res.status(200).json({ products })
}

export default connectDb(handler)