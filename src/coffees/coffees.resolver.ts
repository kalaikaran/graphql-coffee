import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class CoffeesResolver {
  @Query(() => [Coffee], { name: 'coffees' })
  async getAllCoffees() {
    return [];
  }

  @Query(() => Coffee, { name: 'coffee', nullable: true })
  async getCoffee(@Args('id', { type: () => ID }, ParseIntPipe) id: string) {
    return null;
  }
}
