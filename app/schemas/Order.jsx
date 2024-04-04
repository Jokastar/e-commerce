import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


const Order = mongoose.model("Order", orderSchema); 

module.exports = Order; 