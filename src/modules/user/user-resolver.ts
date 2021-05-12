import { User } from '../../model/user';
import { Arg, Query, Resolver } from 'type-graphql';
import { inject, injectable } from 'inversify';
import { Services } from '../../config/services';
import { IErrorService } from '../../services/error.service';

@injectable()
@Resolver(User)
export class UserResolvers {
  constructor(
    @inject(Services.ErrorService) private readonly errorService: IErrorService
  ) {}

  @Query((_returns: void) => User)
  user(
    @Arg('age') age: number
  ): User {
    if (age < 18) {
      this.errorService.throwBadRequestError('Age must be greater than 18');
    }
    return {
      name: 'example',
      email: 'example@example.com',
      age,
    };
  }
}