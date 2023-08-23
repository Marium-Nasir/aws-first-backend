const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

module.exports.handler = async (event, context) => {
  const { username, password } = JSON.parse(event.body);

  try {
    // Call the signInUser function to authenticate the user
    const result = await signInUser(username, password);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

async function signInUser(username, password) {
    const clientId = 'clientId';
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    console.log(data.accesstoken)
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
