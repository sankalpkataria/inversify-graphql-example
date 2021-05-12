import { User } from '../../model/user';
import { Arg, PubSub, PubSubEngine, Query, Resolver, Root, Subscription, SubscriptionOptions } from 'type-graphql';
import { inject, injectable } from 'inversify';
import { Services } from '../../config/services';
import { constants } from '../../config/constants';
import { IErrorService } from '../../services/error.service';

const { SUBSCRIPTION_TOPICS } = constants;

@injectable()
@Resolver(User)
export class UserResolvers {
  constructor(
    @inject(Services.ErrorService) private readonly errorService: IErrorService
  ) {}

  @Query((_returns: void) => User)
  user(
    @PubSub() pubSub: PubSubEngine,
    @Arg('age') age: number
  ): User {
    if (age < 18) {
      this.errorService.throwBadRequestError('Age must be greater than 18');
    }
    pubSub.publish(SUBSCRIPTION_TOPICS.USER_QUERY, `User was queried for age: ${age}`);
    return {
      name: 'example',
      email: 'example@example.com',
      age,
    };
  }

  @Subscription((_returns: void) => String, {topics: SUBSCRIPTION_TOPICS.USER_QUERY})
  subscribeUserQuery(
    @Root() res: string,
  ): string {
    return res;
  }
}