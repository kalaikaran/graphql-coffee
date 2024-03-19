import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Coffee } from './coffee.entity';

@ObjectType({
  description: 'A Flavor entity/ model',
})
@Entity()
export class Flavor {
  @Field(() => ID, { description: 'The id of the flavor.' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(type => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
