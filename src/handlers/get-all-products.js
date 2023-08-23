const {connectDb} = require('../database/db');
const ProductModel = require('../models/productmodel');

module.exports.handler = async(event,context)=>{
    context.callbackWaitsForEmptyEventLoop = false;
    try{
       await connectDb();
       
       let productObj = await ProductModel.find().sort({'updatedAt':-1});
       return{
        statusCode: 200,
        body: JSON.stringify(productObj)
       }
    }catch(err){
      console.log(err);
      return{
        statusCode: err.statusCode || 500,
        body: JSON.stringify({error:err.message})
      }
    }
}