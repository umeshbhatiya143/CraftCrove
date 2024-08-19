import connectDb from "@/middleware/mongoose";
import product from "@/models/product";

const handler = async (req, res) => {
    if (req.method == 'GET') {
        
      const products = await product.find({})
        res.status(200).json(products)
    }
    else{
        res.status(200).json({ error:"This method is not allowed"})
    }
}

export default connectDb(handler)