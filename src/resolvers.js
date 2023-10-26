/*const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();*/

const playlist = require('./sample');

const resolvers = {
  Query: {
    playlistByUser(root, {userId})
    {
      // Utiliza el método find para buscar el objeto en la lista con user igual a userId. 
      const userPlaylist = playlist.find((item) => item.user == userId);

      if (userPlaylist) {
        // Si se encuentra un objeto con el usuario deseado, lo retornas.
        return userPlaylist;
      } else {
        // Si no se encuentra ningún objeto con el usuario deseado, puedes retornar null o lanzar un error, según tus necesidades.
        return null;
      }
    }
  },
  Mutation: {
    likePlaylist(root, {playlistId})
    {
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
    }
  }
};

module.exports = resolvers;
