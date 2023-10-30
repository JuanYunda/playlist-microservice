const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
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

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const server = new ApolloServer({ typeDefs, resolvers });

exports.handler = server.createHandler();

module.exports = schema;