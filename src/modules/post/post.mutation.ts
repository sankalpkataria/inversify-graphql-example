import { Post } from '@/model/post';
import { IResolverMap } from '@/model/apollo';
import { injectable } from 'inversify';

@injectable()
export class PostMutationResolver {
  private addPost = (_parent: any, { id, content }: Post): Post => {
    return {
      id,
      content
    };
  }

  getPostMutations(): IResolverMap {
    return {
      addPost: this.addPost
    }
  }
}

export interface IPostMutationResolver {
  getPostMutations(): IResolverMap
}
