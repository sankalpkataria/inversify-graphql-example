import { Post } from '@/model/post';
import { IResolverMap } from '@/model/apollo';
import { injectable } from 'inversify';

@injectable()
export class PostQueryResolver {
  private post = (_parent: any, { id }: Post): Post => {
    return {
      id,
      content: 'This is a post'
    };
  }

  getPostQueries(): IResolverMap {
    return {
      post: this.post
    }
  }
}

export interface IPostQueryResolver {
  getPostQueries(): IResolverMap
}
