import { NonEmptyArray } from 'type-graphql';
import { UserResolvers } from '@/modules/user/user-resolver';

export const Resolvers: NonEmptyArray<Function> = [
  UserResolvers
];
