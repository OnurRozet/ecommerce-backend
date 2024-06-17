import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOrder( id:number , productName: string, quantity: number, price: number): Promise<Order> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const total = quantity * price;

    if(user.balance < total){
      throw new NotFoundException('Insufficient balance');
    }

    user.balance -= total;

    const order = this.ordersRepository.create({ productName, quantity, price, total, user });
    return this.ordersRepository.save(order);
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({ where: { user: { id: userId } } });
  }
}
