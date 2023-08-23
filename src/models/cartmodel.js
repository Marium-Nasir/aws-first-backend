const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel" },
    products:[
        {
        productId:{ type:mongoose.Schema.Types.ObjectId,ref:"ProductModel"},
        quantity:{type:Number,required:true}
        }
    ]
},
{
    timestamps:true
}
);

module.exports = mongoose.model("CartModel",cartSchema);