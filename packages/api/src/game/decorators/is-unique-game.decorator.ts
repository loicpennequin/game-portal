import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { IGameService } from '../interface/game-service.interface';

@ValidatorConstraint({ name: 'IsGameUnique', async: true })
@Injectable()
export class IsUniqueGameConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(IGameService)
    readonly gameService: IGameService
  ) {}

  async validate(value, { property }) {
    try {
      const count = await this.gameService.count({
        [property]: { eq: value }
      });

      return count === 0;
    } catch (err) {
      console.log(err);
    }
  }
}

export function IsUniqueGame(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string): void => {
    registerDecorator({
      target: object?.constructor,
      options: {
        message: ({ property, value }) =>
          `A game with the ${property} ${value} already exists`,
        ...validationOptions
      },
      constraints: [],
      validator: IsUniqueGameConstraint,
      propertyName
    });
  };
}
