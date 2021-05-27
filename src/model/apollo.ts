import { PubSub } from "apollo-server-express";
import { Request } from "express";

export type Context = {
  req: Request;
  pubsub: PubSub;
}
export type ResolverFn = (parent: any, args: any, ctx: Context, info: any) => any;

export type subscriptionObj = {
  subscribe: (parent: any, args: any, ctx: Context, info: any) => AsyncIterator<unknown, any, undefined>;
};

export interface IResolverMap {
  [key: string]: ResolverFn;
}

export interface ISubscriptionMap {
  [key: string]: subscriptionObj;
}

export interface IResolvers {
  Query?: IResolverMap;
  Mutation?: IResolverMap;
  Subscription?: ISubscriptionMap;
  User?: IResolverMap;
  Post?: IResolverMap;
}
