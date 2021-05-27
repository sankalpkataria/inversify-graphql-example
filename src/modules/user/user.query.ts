import { User } from '@/model/user';
import { IResolverMap } from '@/model/apollo';
import { inject, injectable } from 'inversify';
import { Services } from '@/config/services';
import { IErrorService } from '@/services';
// https://www.graphql-code-generator.com/

@injectable()
export class UserQueryResolver {
  constructor(
    @inject(Services.ErrorService) private readonly errorService: IErrorService
  ) {}

  private user = (_parent: any, { age }: User): User => {
    if (age < 18) {
      this.errorService.throwBadRequestError('Age must be greater than 18');
    }
    return {
      name: 'example',
      email: 'example@example.com',
      age,
    };
  }

  getUserQueries(): IResolverMap {
    return {
      user: this.user
    }
  }
}

export interface IUserQueryResolver {
  getUserQueries(): IResolverMap
}
