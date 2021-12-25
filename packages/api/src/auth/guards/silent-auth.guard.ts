import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SilentAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user): any {
    if (err || !user) return null;

    return user;
  }
}
