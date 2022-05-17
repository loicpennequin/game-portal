import { IPolicyHandler } from 'src/core/decorators/access-control.decorator';
import {
  actions,
  AppAbility
} from 'src/core/factories/access-control-ability.factory';
import { MaybeAuthenticatedRequest } from 'src/core/pipes/validation.pipe';
import { Game } from 'src/game/entities/game.entity';

export class DeleteGamePolicy implements IPolicyHandler {
  register({ can, request }) {
    if (request.user?.isAdmin) {
      can(actions.Delete, Game);
    } else {
      can(actions.Delete, Game, { ownerId: request.user.id });
    }
  }

  handle(ability: AppAbility, request: MaybeAuthenticatedRequest) {
    const game = new Game();
    game.ownerId = request.params.id;

    return ability.can(actions.Delete, game);
  }
}
