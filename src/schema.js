const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const { gql } = require('apollo-server');

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

module.exports = schema;