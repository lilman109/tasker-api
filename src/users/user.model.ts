import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Task } from '../tasks/task.model'; // Import Task model to create relation

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field(() => [Task]) // User has many tasks
  tasks: Task[];
}
