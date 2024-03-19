import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee, Flavor } from './entities';
import { Res } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver(() => Coffee)
export class CoffeeFlavoursResolver {
  constructor(
    // @InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor) private readonly flavorRepository: Repository<Flavor>,
  ) {}
  @ResolveField(() => [Flavor], { name: 'flavors' }) 
  async getFlavoursOfCoffee(@Parent() coffee: Coffee) {
    // console.log('[CoffeeFlavoursResolver] is running...');
    // return await this.flavorRepository.find({ where: { coffees: { id: coffee.id } } });
    return await this.flavorRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffee')
      .where('coffee.id = :coffeeId', { coffeeId: coffee.id })
      .getMany();
  }
}
