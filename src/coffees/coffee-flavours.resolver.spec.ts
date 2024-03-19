import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeFlavoursResolver } from './coffee-flavours.resolver';

describe('CoffeeFlavoursResolver', () => {
  let resolver: CoffeeFlavoursResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeFlavoursResolver],
    }).compile();

    resolver = module.get<CoffeeFlavoursResolver>(CoffeeFlavoursResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
