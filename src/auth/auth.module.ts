import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy }  from './auth.jwt.strategy';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: 'SECRET_KEY',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService,JwtStrategy,JwtModule],
    controllers: [AuthController],
    exports: [AuthService,JwtModule],
})
export class AuthModule {}