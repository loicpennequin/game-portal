import { IPolicyHandler } from 'src/core/decorators/access-control.decorator';
import {
  actions,
  AppAbility
} from 'src/core/factories/access-control-ability.factory';
import { MaybeAuthenticatedRequest } from 'src/core/pipes/validation.pipe';
import { User } from '../entities/user.entity';

export class UpdateUserPolicy implements IPolicyHandler {
  register({ can, request }) {
    can(actions.Update, User, { id: request.user.id });
  }

  handle(ability: AppAbility, request: MaybeAuthenticatedRequest) {
    const user = new User();
    user.id = request.params.id;

    return ability.can(actions.Update, user);
  }
}
