import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../src/users/user.entity';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'your-secret-key',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('validateUser', () => {
    it('should return user for valid credentials', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
      };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user as User);

      const result = await service.validateUser('test@example.com', 'password123');
      expect(result).toEqual({ id: 1, email: 'test@example.com' });
    });

    it('should return null for invalid credentials', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
      };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user as User);

      const result = await service.validateUser('test@example.com', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const user = { id: 1, email: 'test@example.com' };

      const result = await service.login(user);
      expect(result).toHaveProperty('access_token');
    });
  });
});
