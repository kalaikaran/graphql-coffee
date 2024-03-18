import { ObjectType } from '@nestjs/graphql';
// import { Entity } from 'typeorm';
// @Entity()
@ObjectType({
  description: 'A Flavor entity/ model',
})
export class FlavorEntity {}
