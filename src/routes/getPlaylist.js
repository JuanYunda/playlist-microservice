const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { plId } = event.pathParameters;

  const result = await dynamoDB.get({
    TableName: 'Playlists', // Reemplaza con el nombre de tu tabla de canciones
    Key: { plId: plId },
  }).promise();

  if (result.Item) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Canción no encontrada' }),
    };
  }
};
