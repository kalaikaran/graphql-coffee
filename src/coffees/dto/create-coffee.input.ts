import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCoffeeInput {
  @Field(() => String, { description: 'The name of the coffee.' })
  name: string;
  @Field(() => String, { description: 'The brand of the coffee.' })
  brand: string;
  @Field(() => [String], { description: 'The flavors of the coffee.' })
  flavors: string[];
}
