// import { CognitoIdentityServiceProvider } from 'aws-sdk';
// import { createHmac } from 'crypto';
const AWS = require('aws-sdk');
const crypto = require('crypto');
const {connectDb} = require('../database/db');
const UserModel = require('../models/usermodel');

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

module.exports.handler = async(event, context)=> {
  const body = JSON.parse(event.body);
  const { fname,lname,email,password,address,phoneNumber } = body;

  let response;

  try {
    const clientId = 'clientId';
    const userAttributes = [
      { Name: 'given_name', Value: fname },
    ];

    // Sign up the user in Cognito

    let userParam = {
      ClientId: clientId,
      Username: email,
      Password: password,
      UserAttributes: userAttributes,
    }
    
    const cognitoResponse = await cognito.signUp(userParam).promise();

    console.log('User signed up in Cognito:', cognitoResponse);

    response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'User signed up successfully',cognitoResponse: cognitoResponse}),
    };

  } catch (error) {
    console.error('Error:', error);
    response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to sign up' ,errorMsg : error }),
    };
  }

  return response;
}