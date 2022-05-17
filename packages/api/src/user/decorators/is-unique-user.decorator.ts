import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user-service.interface';

@ValidatorConstraint({ name: 'IsUserUnique', async: true })
@Injectable()
export class IsUniqueUserConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(IUserService)
    readonly userService: IUserService
  ) {}

  async validate(value, { property }) {
    try {
      const count = await this.userService.count({
        where: {
          [property]: value
        }
      });

      return count === 0;
    } catch (err) {
      console.log(err);
    }
  }
}

export function IsUniqueUser(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string): void => {
    registerDecorator({
      target: object?.constructor,
      options: {
        message: ({ property, value }) =>
          `A user with the ${property} ${value} already exists`,
        ...validationOptions
      },
      constraints: [],
      validator: IsUniqueUserConstraint,
      propertyName
    });
  };
}
