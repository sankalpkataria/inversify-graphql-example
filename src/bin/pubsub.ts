import { PubSub } from "apollo-server-express";
import { injectable } from "inversify";

@injectable()
export class Pubsub {
  private pubSubInstance: PubSub;
  constructor() {
    this.pubSubInstance = new PubSub();
  }
  // add pubsub implementation here
  getInstance(): PubSub {
    return this.pubSubInstance;
  }  
}

export interface IPubsub {
  getInstance(): PubSub;
}