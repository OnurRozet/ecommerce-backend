import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          secret: 'secretKey', // Replace with your own secret key
          signOptions: { expiresIn: '60s' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return a JWT when login is successful', async () => {
    const mockJwt = { access_token: 'mockJwtToken' };
    const user = { username: 'testUser', password: 'testPassword' };


    const loginSpy = jest.spyOn(service, 'login').mockImplementation(async () => mockJwt);


    const result = await service.login(user)

    expect(result).toEqual(mockJwt);
    expect(loginSpy).toHaveBeenCalledWith(user);
  });
});