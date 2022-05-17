import { IUser } from '@gp/shared';
import { LoginDto } from '../dtos/login.dto';

export type Tokens = { accessToken: string; refreshToken: string };
export interface IAuthService {
  generateTokens(user: IUser): Tokens;

  login(dto: LoginDto): Promise<Tokens>;

  logout(user: IUser): Promise<IUser>;
}

export const IAuthService = Symbol('authService');
