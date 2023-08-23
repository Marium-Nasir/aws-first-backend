const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');

exports.handler = async (event) => {
  const token = event.accessToken; // Replace 'accessToken' with the key where the Cognito access token is provided in the event

  const cognitoUserPoolId = 'cognitoUserPoolId';//your cognitoUserPoolId
  const cognitoJwkUrl = `https://cognito-idp.us-east-1.amazonaws.com/${cognitoUserPoolId}/.well-known/jwks.json`;

  try {
    // Fetch the JWK from the Cognito URL
    const { data } = await axios.get(cognitoJwkUrl);
    const jwk = data.keys[0];

    // Convert JWK to PEM format for verification
    const pem = jwkToPem(jwk);

    // Validate the Cognito access token
    const decodedToken = jwt.verify(token, pem, { algorithms: ['RS256'] });
    return decodedToken;
  } catch (error) {
    console.error('Error validating token:', error);
    throw error;
  }
};
