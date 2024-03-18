import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'json' })
  flavors: string[];
}
