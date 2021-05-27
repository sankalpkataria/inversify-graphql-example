import { constants } from '@/config/constants';
import { Context, ISubscriptionMap } from '@/model/apollo';
import { injectable } from 'inversify';

const { SUBSCRIPTION_TOPICS } = constants;

@injectable()
export class UserSubscriptionResolver {
  private userAdded = {
    subscribe: (_parent: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator([SUBSCRIPTION_TOPICS.USER_ADDED]),
  }

  getUserSubscriptions(): ISubscriptionMap {
    return {
      userAdded: this.userAdded
    }
  }
}

export interface IUserSubscriptionResolver {
  getUserSubscriptions(): ISubscriptionMap
}
