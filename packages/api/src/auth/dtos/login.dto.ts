import { IsEmail, IsNotEmpty } from 'class-validator';
import { Email, ILoginDto } from '@gp/shared';

export class LoginDto implements ILoginDto {
  @IsEmail()
  email: Email;

  @IsNotEmpty()
  password: string;
}
