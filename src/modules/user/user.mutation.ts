import { User } from '@/model/user';
import { Context, IResolverMap } from '@/model/apollo';
import { inject, injectable } from 'inversify';
import { Services } from '@/config/services';
import { IErrorService } from '@/services';
import { constants } from '@/config/constants';

const { SUBSCRIPTION_TOPICS } = constants;

@injectable()
export class UserMutationResolver {
  constructor(
    @inject(Services.ErrorService) private readonly errorService: IErrorService
  ) {}

  private addUser = async (_parent: any, { name, email, age }: User, { pubsub }: Context): Promise<User> => {
    if (age < 18) {
      this.errorService.throwBadRequestError('Age must be greater than 18');
    }
    const user = {
      name,
      email,
      age,
      id: (global as any).id
    };
    (global as any).id++;
    await pubsub.publish(SUBSCRIPTION_TOPICS.USER_ADDED, {
      userAdded: user
    });
    return user;
  }

  getUserMutations(): IResolverMap {
    return {
      addUser: this.addUser
    }
  }
}


export interface IUserMutationResolver {
  getUserMutations(): IResolverMap
}

