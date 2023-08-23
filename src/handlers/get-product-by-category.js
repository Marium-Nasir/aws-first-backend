const {connectDb} = require('../database/db');
const ProductModel = require('../models/productmodel');

module.exports.handler = async(event,context)=>{
    context.callbackWaitsForEmptyEventLoop = false;
    try{
       await connectDb();
       const {category} = event.pathParameters;
       console.log(category);
       
       let productObj = await ProductModel.find({productCategory:category});
    //    console.log("productobject" + productObj);
    if(!productObj){
        console.log('error');
    }
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