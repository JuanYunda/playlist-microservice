const resolvers = require('./resolvers');
	
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();


const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    playlistByUser(userId: ID!): Playlist
  }

  type Playlist {
    id: ID!
    user: ID!
    title: String!
    likes: Int!
    songs: [ID]!
  }

  type Mutation {
    likePlaylist(playlistId: ID!): Boolean
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();