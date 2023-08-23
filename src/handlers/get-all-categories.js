const {connectDb} = require('../database/db');
const ProductModel = require('../models/productmodel');

module.exports.handler = async(event,context)=>{
    context.callbackWaitsForEmptyEventLoop = false;
    try {
      await connectDb();
  
      let productObj = await ProductModel.find().select({ "productCategory": 1, "_id": -1 });
      if (productObj) {
          const categories = productObj.map(item => item.productCategory);  // Extracting only the category values
          const uniqueCategories = [...new Set(categories)];  // Creating an array of unique categories
          return {
              statusCode: 200,
              body: JSON.stringify(uniqueCategories)
          };
      }
  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({ message: "Internal Server Error" })
      };
  }
}  
