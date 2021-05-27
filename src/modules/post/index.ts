import { Mutation, Query, Types } from './gql';
import { inject, injectable } from 'inversify';
import { IPostQueryResolver, PostQueryResolver } from './post.query';
import { IPostMutationResolver, PostMutationResolver } from './post.mutation';
import { DocumentNode } from 'graphql';
import { Resolvers } from '@/config/resolvers';
import { IResolvers } from '@/model/apollo';

@injectable()
export class Post {
  constructor(
    @inject(Resolvers.PostQueryResolver) private readonly postQueryResolver: IPostQueryResolver,
    @inject(Resolvers.PostMutationResolver) private readonly postMutationResolver: IPostMutationResolver
  ) {}

  getResolvers(): IResolvers {
    return {
      Query: this.postQueryResolver.getPostQueries(),
      Mutation: this.postMutationResolver.getPostMutations()
    };
  }

  getTypes(): DocumentNode[] {
    return [Types, Query, Mutation];
  }

};

export interface IPost {
  getResolvers(): IResolvers;
  getTypes(): DocumentNode[];
}

export {
  IPostQueryResolver,
  PostQueryResolver,
  IPostMutationResolver,
  PostMutationResolver
}
