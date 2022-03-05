import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { schema} from './schemas';
import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
  function callbackWithHeaders(error, output) {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }

  const handler = graphqlLambda({ schema: myGraphQLSchema });
  return handler(event, context, callbackWithHeaders);
};