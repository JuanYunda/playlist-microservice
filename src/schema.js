const { gql } = require('apollo-server');

const typeDefs = gql`
  type Song {
    id: ID!
    title: String
    artist: String
  }

  type Playlist{
    id: ID!
    title: String
    songs: [Song]
  }

  type User {
    id: ID!
    username: String
  }

  type Query {
    playlist(id: ID!): Playlist
    user(id: ID!): User
  }

  type Mutation {
    likeSong(userId: ID!, songId: ID!): Boolean
  }
`;

module.exports = typeDefs;
