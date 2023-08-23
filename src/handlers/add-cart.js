const { connectDb } = require("../database/db");
const CartModel = require("../models/cartmodel");
const UserModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");

module.exports.handler = async (event, context) => {
  // context.callbackWaitsForEmptyEventLoop = false;
  console.log(JSON.stringify(event));
  const token = event.headers.authorization.split(" ")[1];
  console.log(`token pass: ${token}`);

  const { productId, quantity, createdDate } = JSON.parse(event.body);
  try {
    console.log(token);
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

        const cartData = {
          userId: userId,
          products: [{ productId: productId, quantity: quantity }],
          createdDate: createdDate,
        };
        const mongoData = await CartModel.create(cartData);
        console.log(mongoData);
        return {
          statusCode: 201,
          body: JSON.stringify({ msg: mongoData }),
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
