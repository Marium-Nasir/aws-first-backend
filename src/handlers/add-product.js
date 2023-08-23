const { connectDb } = require("../database/db");
const ProductModel = require("../models/productmodel");
const UserModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(JSON.stringify(event));
  const token = event.headers.authorization.split(" ")[1];
  console.log(`token pass: ${token}`);
  const {
    productTitle,
    productPrice,
    productDescription,
    productImage,
    productCategory,
  } = JSON.parse(event.body);
  try {
    console.log(token)
    // Decode the access token to get the user ID (sub field)
    const decodedToken = jwt.decode(token);
    if (decodedToken !== null) {
      const data = JSON.stringify(decodedToken);
      const val = decodedToken.sub;
      console.log(`decodedtoken : ${data}`);
      console.log(`decoded.sub : ${val}`);
      const subVal = decodedToken.sub;
      console.log(`sub : ${subVal}`);
      //Connect Mongodb
      await connectDb();

      let userData = await UserModel.findOne({ userName: subVal });
      console.log(`userData:${userData}`);
      if (userData) {
        const valId = userData._id;
        console.log(`userData._id:${valId}`);
        let userId = userData._id;
        console.log(`userId:${userId}`);

        let productObj = {
          productTitle,
          productPrice,
          productCategory,
          productDescription,
          productImage,
          userId: userId,
        };
        productObj = await ProductModel.create(productObj);
        return {
          statusCode: 201,
          body: JSON.stringify({productObj:productObj}),
        };
      }
    }
  
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};


