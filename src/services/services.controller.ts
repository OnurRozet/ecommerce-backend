import { ServicesService } from './services.service';
import { Body, Controller, Delete, Get, Post ,Request} from '@nestjs/common';
import { Service } from './services.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {
  }


  @Get()
  async GetAll() {
    return this.servicesService.findAll();
  }

  @Post('create')
  async create(@Body() service: Service) {
    return this.servicesService.create(service);
  }

  @Delete(':id')
  async deleteService(@Request() req) {
    return this.servicesService.deleteService(req.params.id);
  }

}