import { AuthService } from '../auth.service';
import { IAuthService } from '../interfaces/auth-service.interface';

export const authServiceProvider = {
  provide: IAuthService,
  useClass: AuthService
};
