import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../orders/orders.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('decimal' ,{nullable: false, default: 0})
    balance: number;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}