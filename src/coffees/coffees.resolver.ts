import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
  constructor( private readonly coffeesService: CoffeesService) {}

  @Query(() => [Coffee], { name: 'coffees' })
  async getAllCoffees() {
    return this.coffeesService.getAllCoffees();
  }

  @Query(() => Coffee, { name: 'coffee', nullable: true })
  async getCoffee(@Args('id', { type: () => ID }, ParseIntPipe) id: string) {
    return this.coffeesService.getOneCoffee(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee' , nullable: true})
  async createCoffee(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,) {
    return this.coffeesService.createCoffee(createCoffeeInput);
  }
}
