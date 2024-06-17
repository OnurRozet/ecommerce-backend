import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userDto = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        password: 'password123',
        balance: 100000,
      };

      jest.spyOn(service, 'create').mockResolvedValue({
        ...userDto,
        id: 1,
        orders: [],
      });

      const result = await controller.create(userDto);

      expect(result).toEqual({
        ...userDto,
        id: 1,
        orders: [],
      });
    });
  });
});