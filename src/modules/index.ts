import { NonEmptyArray } from 'type-graphql';
import { UserResolvers } from './user/user-resolver';

export const Resolvers: NonEmptyArray<Function> = [
  UserResolvers
];
