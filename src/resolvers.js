/*const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();*/

const playlist = require('./sample');

const resolvers = {
  Query: {
    playlistByUser(root, userId)
    {
      console.log(userID);
      return playlist;
    }
  },
  Mutation: {
    likePlaylist(root, playlistId){
      console.log(playlistId);
      
    }
  }
};

module.exports = resolvers;
