/*const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();*/

const resolvers = {
  Query: {
    playlist(root, args) {
      return('toma tu playlist ' + args.id + ' y no me molestes.');
    }
  }
};

module.exports = resolvers;
