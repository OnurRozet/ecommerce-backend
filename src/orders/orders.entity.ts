import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  price: number;

  @Column('decimal')
  total: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;
}
