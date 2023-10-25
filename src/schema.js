const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Playlist{
    id: ID!
    title: String
    songs: [ID]
  }

  type Query {
    playlist(id: ID!): String
  }

  type Mutation {
    likeSong(userId: ID!, songId: ID!): String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

module.exports = schema;