//const { ApolloServer } = require('apollo-server');

/*const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key',
  region: 'your-region',
});*/

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema');

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.listen(3000, () => console.log("server running in 3000"));

/*const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Servidor GraphQL en ${url}`);
});
*/
