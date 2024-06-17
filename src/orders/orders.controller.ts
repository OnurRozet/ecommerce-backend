import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/auth.jwtauthguard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOrder(@Request() req, @Body() createOrderDto: { productName: string, quantity: number, price: number }) {
    const userId = req.user.userId;
    const { productName, quantity, price } = createOrderDto;
    return this.ordersService.createOrder(userId, productName, quantity, price);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserOrders(@Request() req) {
    const userId = req.user.id;
    return this.ordersService.getUserOrders(userId);
  }
}
