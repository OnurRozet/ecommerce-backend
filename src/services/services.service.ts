import { Repository } from 'typeorm';
import { Service } from './services.entity';
import { InjectRepository } from '@nestjs/typeorm';


export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private  readonly  servicesRepository : Repository<Service>
  ) {}

  async findAll(): Promise<Service[]> {
    return this.servicesRepository.find();
  }

 async create(service: Service): Promise<Service> {
    const category  = this.servicesRepository.create(service)
    return this.servicesRepository.save(category);
  }

  async deleteService(id: number): Promise<void> {
    await  this.servicesRepository.delete(id);
  }
}