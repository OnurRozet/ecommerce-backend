import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from '../src/auth/auth.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../src/users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
      controllers: [AuthController],
      imports: [JwtService,UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return a JWT when login is successful', async () => {
    const user = { id: 1, email: 'test@example.com' };
    const expectedToken = { access_token: 'mockJwtToken' };

    jest.spyOn(service, 'login').mockResolvedValue(expectedToken);

    const result = await service.login(user);
    expect(result).toEqual(expectedToken);
  });
});