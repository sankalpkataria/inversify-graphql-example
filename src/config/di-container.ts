import { Container } from 'inversify';
import { 
  ILoggerService,
  LoggerService,
  ErrorService,
  IErrorService
} from '@/services';
import { Services } from './services';
import { BootStrapers } from './boot-strapers';
import { App, IApp } from '@/bin/app';
import { Apollo, IApollo } from '@/bin/apollo';
import { IServer, Server } from '@/bin/server';
import { Resolvers } from './resolvers';
import {
  IUser,
  User,
  IUserQueryResolver,
  UserQueryResolver,
  IUserMutationResolver,
  UserMutationResolver,
  IUserSubscriptionResolver,
  UserSubscriptionResolver
} from '@/modules/user';
import {
  IPost,
  Post,
  IPostMutationResolver,
  PostMutationResolver,
  IPostQueryResolver,
  PostQueryResolver
} from '@/modules/post';
import { ISchema, Schema } from '@/modules';
import { IPubsub, Pubsub } from '@/bin/pubsub';

const bindResolverMethods = (c: Container) => {
  c.bind<IUserQueryResolver>(Resolvers.UserQueryResolver).to(UserQueryResolver).inSingletonScope();
  c.bind<IUserMutationResolver>(Resolvers.UserMutationResolver).to(UserMutationResolver).inSingletonScope();
  c.bind<IUserSubscriptionResolver>(Resolvers.UserSubscriptionResolver).to(UserSubscriptionResolver).inSingletonScope();
  c.bind<IPostQueryResolver>(Resolvers.PostQueryResolver).to(PostQueryResolver).inSingletonScope();
  c.bind<IPostMutationResolver>(Resolvers.PostMutationResolver).to(PostMutationResolver).inSingletonScope();
};

const bindResolvers = (c: Container) => {
  bindResolverMethods(c);
  c.bind<IUser>(Resolvers.User).to(User).inSingletonScope();
  c.bind<IPost>(Resolvers.Post).to(Post).inSingletonScope();
}

// Binds service signatures to their implementations
const bindServices = (c: Container) => {
  c.bind<ILoggerService>(Services.LoggerService).to(LoggerService).inSingletonScope();
  c.bind<IErrorService>(Services.ErrorService).to(ErrorService).inSingletonScope();
}

// Binds service signatures to their implementations
const bindBootstrapers = (c: Container) => {
  c.bind<IApollo>(BootStrapers.Apollo).to(Apollo).inSingletonScope();
  c.bind<IApp>(BootStrapers.App).to(App).inSingletonScope();
  c.bind<IServer>(BootStrapers.Server).to(Server).inSingletonScope();
  c.bind<ISchema>(BootStrapers.Schema).to(Schema).inSingletonScope();
  c.bind<IPubsub>(BootStrapers.Pubsub).to(Pubsub);
}

const DIContainer = new Container();
bindResolvers(DIContainer);
bindServices(DIContainer);
bindBootstrapers(DIContainer);

export default DIContainer;