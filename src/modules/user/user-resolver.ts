import { User } from '@/model/user';
import { Arg, PubSub, PubSubEngine, Query, Resolver, Root, Subscription, Mutation } from 'type-graphql';
import { inject, injectable } from 'inversify';
import { Services } from '@/config/services';
import { constants } from '@/config/constants';
import { IErrorService } from '@/services/error.service';

const { SUBSCRIPTION_TOPICS } = constants;

(global as any).id = 1;

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
      id: (global as any).id,
      name: 'example',
      email: 'example@example.com',
      age,
    };
  }

  @Mutation((_returns: void) => User)
  addUser(
    @PubSub() pubSub: PubSubEngine,
    @Arg('age') age: number,
    @Arg('name') name: string,
    @Arg('email') email: string
  ): User {
    if (age < 18) {
      this.errorService.throwBadRequestError('Age must be greater than 18');
    }
    const user = {
      name,
      email,
      age,
      id: (global as any).id,
    };
    (global as any).id++;
    pubSub.publish(SUBSCRIPTION_TOPICS.USER_ADDED, user);
    return user;
  }

  @Subscription((_returns: void) => User, {topics: SUBSCRIPTION_TOPICS.USER_ADDED})
  userAdded(
    @Root() res: User,
  ): User {
    return res;
  }
}