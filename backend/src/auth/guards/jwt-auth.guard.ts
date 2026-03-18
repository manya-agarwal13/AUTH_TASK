import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This guard checks if JWT token is valid
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}