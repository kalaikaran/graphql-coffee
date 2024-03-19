import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flavor } from './flavor.entity';
@Entity()
@ObjectType({
  description: 'A coffee entity/ model',
})
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, {
    description: 'Unique identifier for the coffee',
    nullable: true,
  })
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(type => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;
}
