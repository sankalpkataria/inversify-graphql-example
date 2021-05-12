import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field({ nullable: false })
  public name!: string;

  @Field({ nullable: false })
  public email!: string;

  @Field((_type) => Int)
  public age?: number;
}