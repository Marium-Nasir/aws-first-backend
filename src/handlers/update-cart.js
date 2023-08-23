const { connectDb } = require("../database/db");
const CartModel = require("../models/cartmodel");
const UserModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");

module.exports.handler = async (event, context) => {
  // context.callbackWaitsForEmptyEventLoop = false;
  console.log(JSON.stringify(event));
  const token = event.headers.authorization.split(" ")[1];
  console.log(`token pass: ${token}`);

  const { id } = event.pathParameters;

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

        const cartDataById = await CartModel.findOne({userId:userId});
        console.log(`cartDataById ${cartDataById}`)
        if (cartDataById) {
          const cartData = {
            userId:cartDataById.userId,
            products: [{ productId: productId, quantity: quantity }],
            createdDate: createdDate,
          };
          const mongoData = await CartModel.findByIdAndUpdate({ _id: id }, cartData, {
            new: true,
          });
          console.log(mongoData);
          if (mongoData) {
            return {
              statusCode: 200,
              body: JSON.stringify({
                UpdatedData: mongoData,
                msg: "Cart has been updated successfully",
              }),
            };
          } else if (!mongoData) {
            return {
              statusCode: 404,
              body: JSON.stringify({ message: "Cart does not exists" }),
            };
          }
        }else{
          return{
          statusCode: 404,
          body: JSON.stringify({msg:"Not Authorized User"})
        }}
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
