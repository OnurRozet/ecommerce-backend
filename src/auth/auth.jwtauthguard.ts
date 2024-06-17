import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            return false;
        }

        try {
            request.user = this.jwtService.verify(token, { secret: 'SECRET_KEY' });
            return true;
        } catch (e) {
            return false;
        }
    }
}
