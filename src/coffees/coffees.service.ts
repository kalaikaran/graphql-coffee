import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';

@Injectable()
export class CoffeesService {
  async getAllCoffees() {
    return []; // 'This action returns all coffees';
  }

  async getOneCoffee(id: string) {
    return null;  // `This action returns #${id} coffee`;
  }

  async createCoffee(createCoffeeInput: CreateCoffeeInput) {
    return null; // createCoffeeInput;
  }
}
