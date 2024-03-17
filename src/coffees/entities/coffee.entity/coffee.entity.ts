import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({
  description: 'A coffee entity/ model',
})
export class Coffee {
  @Field(() => ID, {
    description: 'Unique identifier for the coffee',
    nullable: true,
  })
  id: string;
  name: string;
  brand: string;
  flavors: string[];
}
