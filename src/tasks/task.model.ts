import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user.model'; // Import User model to create relation

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  createdAt: Date;

  @Field(() => User) // Task belongs to User
  user: User;

  @Field(() => Int)
  userId: number;
}
