import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdateCoffeeInput } from './dto/update-coffee.input';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
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
    const coffee = this.coffeesRepository.create(createCoffeeInput);
    return this.coffeesRepository.save(coffee);
  }

  async updateCoffee(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
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
}
