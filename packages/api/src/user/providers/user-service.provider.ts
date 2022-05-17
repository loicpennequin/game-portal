import { Provider } from '@nestjs/common';
import { IUserService } from '../interfaces/user-service.interface';
import { UserService } from '../services/user.service';

export const userServiceProvider: Provider = {
  provide: IUserService,
  useClass: UserService
};
