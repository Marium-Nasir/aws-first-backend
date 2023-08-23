const AWS = require('aws-sdk');
const {connectDb} = require('../database/db');
const UserModel = require('../models/usermodel');


async function saveUserData(userData) {
  try {
    // Connect to MongoDB
   await connectDb()

    // Create a new user instance with the retrieved data
    const user = new UserModel({
      fname:userData.given_name,
      userName: userData.sub,
      email: userData.email,
      // Add other attributes as needed
    });

    // Save the user data to MongoDB
    const mongodata = await user.save();
    console.log(mongodata);
  } catch (error) {
    throw error;
  } 
}

module.exports.handler = async (event) => {
  const userData = event.request.userAttributes;

  try {
    await saveUserData(userData);
    console.log('User data saved to MongoDB successfully.');
  } catch (error) {
    console.error('Error saving user data to MongoDB:', error);
  }
};
