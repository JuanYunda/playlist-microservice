const AWS = require("aws-sdk");

let dynamodbClientParams = {};

if (process.env.IS_OFFLINE) {
  dynamodbClientParams = {
    region: "localhost",
    endpoint: "http://localhost:8000"
  };
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamodbClientParams);

const resolvers = {
  Query: {
    playlistByUser: async (event) => {
      let dynamodbClientParams = {};

      if (process.env.IS_OFFLINE) {
        dynamodbClientParams = {
          region: "localhost",
          endpoint: "http://localhost:8000",
          accessKeyId: "testingAccessKey",
          secretAccessKey: "testingSecretKey",
        };
      }

      const dynamodb = new AWS.DynamoDB.DocumentClient(dynamodbClientParams);
      const { name } = event.pathParameters;
      let playList;

      try {
        const params = {
          TableName: "PlayListsTable",
          KeyConditionExpression: "#name = :name",
          ExpressionAttributeNames: {
            "#name": "name",
          },
          ExpressionAttributeValues: {
            ":name": name,
          },
        };
        const result = await dynamodb.query(params).promise();
        playList = result.Items;
      } catch (error) {
        console.error(
          "Error en playListService/getPlayList.js al consultar: ",
          error
        );
        return {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            msg: `Error en getPlayList al ejecutar un query a la tabla PlayListsTable de nombre ${name}, error: ${error}`,
          }),
        };
      }

      if (playList.length !== 0) {
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(playList),
        };
      } else {
        return {
          statusCode: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            msg: "no existe una PlayList con ese nombre",
          }),
        };
      }
    },
  },
  Mutation: {
    likePlaylist(root, { playlistId }) {
      // Utiliza el método find para buscar el objeto en la lista con id igual a playlistId.
      const userPlaylist = playlist.find((item) => item.id == playlistId);

      if (userPlaylist) {
        // Si se encuentra un objeto con el usuario deseado:
        userPlaylist.likes++;
        console.log(userPlaylist.likes);
        return true;
      } else {
        // Si no se encuentra ningún objeto con el id deseado:
        return false;
      }
    },
  },
};

module.exports = resolvers;
