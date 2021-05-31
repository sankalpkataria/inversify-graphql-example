import { ApolloServer } from 'apollo-server-express';
import { constants } from '@/config/constants';
import depthLimit from 'graphql-depth-limit';
import { inject, injectable } from 'inversify';
import { GraphQLSchema } from 'graphql';
import { Resolvers } from '@/modules/';
import DIContainer from '@/config/di-container';
import { buildSchema } from 'type-graphql';
import { Services } from '@/config/services';
import { ILoggerService } from '@/services/logger.service';

const {NODE_ENV, ENVIRONMENTS, GRAPHQL_DEPTH_LIMIT, LOG_LEVELS, ERRORS } = constants;

@injectable()
export class Apollo {
  constructor(
    @inject(Services.LoggerService) 
    private readonly logger: ILoggerService,
  ) {}

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
    console.error(error, 'error');
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