import { ApolloServer, IResolvers } from 'apollo-server-express';
import { constants } from '@/config/constants';
import depthLimit from 'graphql-depth-limit';
import { inject, injectable } from 'inversify';
import { BootStrapers } from '@/config/boot-strapers';
import { ISchema } from '@/modules';
import { IPubsub } from './pubsub';

const {NODE_ENV, ENVIRONMENTS, GRAPHQL_DEPTH_LIMIT} = constants;

@injectable()
export class Apollo {
  constructor(
    @inject(BootStrapers.Schema) private readonly schema: ISchema,
    @inject(BootStrapers.Pubsub) private readonly pubsub: IPubsub,
  ) {}

  private formatError(error: Error) {
    //  Format errors here
    console.error(error, 'error');
    return error;
  }

  init(): ApolloServer {
    const isProduction = NODE_ENV === ENVIRONMENTS.PROD;
    return new ApolloServer({
      resolvers: this.schema.getResolvers() as IResolvers<any, any>,
      typeDefs: this.schema.getTypeDefs(),
      context: (req) => ({
        req,
        pubsub: this.pubsub.getInstance()
      }),
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
  init(): ApolloServer;
}