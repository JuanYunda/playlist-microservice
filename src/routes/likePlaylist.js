const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { songId, userId } = JSON.parse(event.body);

  // Verifica si el usuario ya dio like a la canción
  const likedSongs = await dynamoDB.get({
    TableName: 'UserLikes', // Reemplaza con el nombre de tu tabla de likes de usuarios
    Key: { userId: userId },
  }).promise();

  if (!likedSongs.Item) {
    likedSongs.Item = {
      userId: userId,
      likedSongs: [],
    };
  }

  if (!likedSongs.Item.likedSongs.includes(songId)) {
    likedSongs.Item.likedSongs.push(songId);

    await dynamoDB.put({
      TableName: 'UserLikes', // Reemplaza con el nombre de tu tabla de likes de usuarios
      Item: likedSongs.Item,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Canción marcada como favorita' }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'La canción ya ha sido marcada como favorita' }),
    };
  }
};
