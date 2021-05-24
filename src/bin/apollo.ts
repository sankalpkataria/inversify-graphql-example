import { ApolloServer } from 'apollo-server-express';
import { constants } from '@/config/constants';
import depthLimit from 'graphql-depth-limit';
import { injectable } from 'inversify';
import { GraphQLSchema } from 'graphql';
import { Resolvers } from '@/modules/';
import DIContainer from '@/config/di-container';
import { buildSchema } from 'type-graphql';

const {NODE_ENV, ENVIRONMENTS, GRAPHQL_DEPTH_LIMIT} = constants;

@injectable()
export class Apollo {
  private async createSchema (): Promise<GraphQLSchema> {
    return buildSchema({
      resolvers: Resolvers,
      dateScalarMode: 'timestamp',
      container: DIContainer,
      validate: false
    });
  }

  private formatError(error: Error) {
    //  Format errors here
    return error;
  }

  async init(): Promise<ApolloServer> {
    const schema = await this.createSchema();
    const isProduction = NODE_ENV === ENVIRONMENTS.PROD;
    return new ApolloServer({
      schema,
      debug: !constants,
      introspection: !isProduction,
      playground: !isProduction,
      tracing: !isProduction,
      formatError: this.formatError,
      validationRules: [depthLimit(GRAPHQL_DEPTH_LIMIT)]
    });
  }
}

export interface IApollo {
  init: () => Promise<ApolloServer>;
}