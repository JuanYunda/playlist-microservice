const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const resolvers = {
  Query: {
    song: async (parent, { id }) => {
      const params = {
        TableName: 'Songs',
        Key: { id: id },
      };
      try {
        const data = await dynamoDB.get(params).promise();
        return data.Item;
      } catch (error) {
        console.error('Error al obtener la canción desde DynamoDB:', error);
        throw new Error('Error al obtener la canción');
      }
    },
    user: async (parent, { id }) => {
      const params = {
        TableName: 'Users',
        Key: { id: id },
      };
      try {
        const data = await dynamoDB.get(params).promise();
        return data.Item;
      } catch (error) {
        console.error('Error al obtener el usuario desde DynamoDB:', error);
        throw new Error('Error al obtener el usuario');
      }
    },
  },
  Mutation: {
    likeSong: async (parent, { userId, songId }) => {
      // Implementa la lógica para dar like a una canción en DynamoDB
      // Puedes usar el método `update` para modificar los datos en la tabla
      // Retorna true si la operación fue exitosa, o false en caso contrario
    },
  },
};

module.exports = resolvers;
