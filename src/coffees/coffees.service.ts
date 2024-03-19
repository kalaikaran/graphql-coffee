import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { In, Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Flavor } from './entities';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}
  async getAllCoffees() {
    return await this.coffeesRepository.find(); // 'This action returns all coffees';
  }

  async getOneCoffee(id: number) {
    const coffee = await this.coffeesRepository.findOne({ where: { id } }); // `This action returns #${id} coffee`;
    if (!coffee) throw new UserInputError(`Coffee #${id} does not exist`);
    return coffee;
  }

  async createCoffee(createCoffeeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeesRepository.create({
      ...createCoffeeInput,
      flavors,
    });
    return this.coffeesRepository.save(coffee);
  }

  async updateCoffee(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const flavors = updateCoffeeInput.flavors && (await Promise.all(
      updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    ));
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.coffeesRepository.save(coffee);
  }

  async removeCoffee(id: number) {
    const coffee = await this.getOneCoffee(id);
    return await this.coffeesRepository.remove(coffee);
  }

  async preloadFlavorByName(name: string) : Promise<Flavor> {
    const existingFlavor = await this.flavorsRepository.findOne({ where: { name } });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name }); 
  }
}
