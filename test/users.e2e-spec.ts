import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [UsersService,
        {
          provide:getRepositoryToken(User),
          useClass:Repository,
        }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/create (POST)', () => {
    const userDto = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      balance:100000,
      orders: [],
    };
    return request(app.getHttpServer())
      .post('/users/create')
      .expect(201)
      .then((response) => {
        expect(response.body.firstname).toEqual(userDto.firstname);
        expect(response.body.lastname).toEqual(userDto.lastname);
        expect(response.body.email).toEqual(userDto.email);
        expect(response.body.password).toBeDefined();
        expect(response.body.balance).toEqual(userDto.balance);
      });
  });
});
