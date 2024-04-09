import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        // console.log(req.body)
        let user = await User.findOne({ "email": req.body.email })
        var bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText)
        if (user) {
            if (user.email === req.body.email && originalText === req.body.password) {
                var token = jwt.sign({ email:req.email, password:req.password}, 'jwtsecret');
                res.status(200).json({ success: "true", token:token })
            }
            else {
                res.status(200).json({ success: "Invalid Credentials" })
            }
        }
        else {
            res.status(200).json({ error: "No user found" })
        }
    }
}

export default connectDb(handler)