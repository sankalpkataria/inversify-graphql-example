import { Mutation, Query, Types, Subscription } from './gql';
import { inject, injectable } from 'inversify';
import { IUserQueryResolver, UserQueryResolver } from './user.query';
import { IUserMutationResolver, UserMutationResolver } from './user.mutation';
import { IUserSubscriptionResolver, UserSubscriptionResolver } from './user.subscription';
import { DocumentNode } from 'graphql';
import { Resolvers } from '@/config/resolvers';
import { IResolvers } from '@/model/apollo';

@injectable()
export class User {
  constructor(
    @inject(Resolvers.UserQueryResolver) private readonly userQueryResolver: IUserQueryResolver,
    @inject(Resolvers.UserMutationResolver) private readonly userMutationResolver: IUserMutationResolver,
    @inject(Resolvers.UserSubscriptionResolver) private readonly userSubscriptionResolver: IUserSubscriptionResolver
  ) {}

  getResolvers(): IResolvers {
    return {
      Query: this.userQueryResolver.getUserQueries(),
      Mutation: this.userMutationResolver.getUserMutations(),
      Subscription: this.userSubscriptionResolver.getUserSubscriptions()
    };
  }

  getTypes(): DocumentNode[] {
    return [Types, Query, Mutation, Subscription];
  }

};

export interface IUser {
  getResolvers(): IResolvers
  getTypes(): DocumentNode[];
}

export {
  IUserQueryResolver,
  UserQueryResolver,
  IUserMutationResolver,
  UserMutationResolver,
  IUserSubscriptionResolver,
  UserSubscriptionResolver
}
