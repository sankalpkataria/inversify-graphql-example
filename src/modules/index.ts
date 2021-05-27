import { Resolvers } from '@/config/resolvers';
import { IResolvers } from '@/model/apollo';
import { DocumentNode } from 'graphql';
import { inject, injectable } from 'inversify';
import { merge } from 'lodash';
import { IPost } from './post';
import { IUser } from './user';

@injectable()
export class Schema {
  constructor(
    @inject(Resolvers.User) private readonly user: IUser,
    @inject(Resolvers.Post) private readonly post: IPost
  ) {}

  getResolvers(): IResolvers {
    return [
      this.user.getResolvers(),
      this.post.getResolvers()
    ].reduce(merge);
  }

  getTypeDefs(): DocumentNode[] {
    return [
      ...this.user.getTypes(),
      ...this.post.getTypes()
    ];
  }
}

export interface ISchema {
  getResolvers(): IResolvers;
  getTypeDefs(): DocumentNode[];
}
