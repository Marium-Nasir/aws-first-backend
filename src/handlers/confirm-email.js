const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

exports.handler = async (event, context) => {
  const { username, confirmationCode } = JSON.parse(event.body);
  
  try {
    // Call the confirmSignUp function to confirm the user's email address
    const result =  await confirmUser(username, confirmationCode );
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email confirmation successful.', cognitoResults : result }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

async function confirmUser(username, confirmationCode) {
  const clientId = 'clientId';//Your Client Id
  const params = {
    ClientId: clientId,
    Username: username,
    ConfirmationCode: confirmationCode,
  };

  try {
    const data = await cognito.confirmSignUp(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ data: data }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
