import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { CoffeesService } from './coffees.service';
import { UpdateCoffeeInput } from './dto/update-coffee.input';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Query(() => [Coffee], { name: 'coffees' })
  async getAllCoffees() {
    return this.coffeesService.getAllCoffees();
  }

  @Query(() => Coffee, { name: 'coffee' })
  async getCoffee(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeesService.getOneCoffee(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee' })
  async createCoffee(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeesService.createCoffee(createCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'updateCoffee' })
  async updateCoffee(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return await this.coffeesService.updateCoffee(id, updateCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'removeCoffee' })
  async removeCoffee(@Args('id', ParseIntPipe) id: number) {
    return await this.coffeesService.removeCoffee(id);
  }
}
