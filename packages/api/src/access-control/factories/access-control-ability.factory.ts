import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityClass,
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects
} from '@casl/ability';
import { User } from 'src/user/entities/user.entity';
import { Game } from 'src/game/entities/game.entity';
import { Values } from '@gp/shared';
import { IPolicyHandler } from '../decorators/access-control.decorator';
import { MaybeAuthenticatedRequest } from 'src/core/pipes/validation.pipe';

export const actions = {
  Manage: 'manage',
  Create: 'create',
  Read: 'read',
  Update: 'update',
  Delete: 'delete'
};
type Action = Values<typeof actions>;

type Subjects = InferSubjects<typeof Game | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;
export type AccessControlPolicy = (options: {
  request: MaybeAuthenticatedRequest;
  can: any;
  cannot: any;
}) => void;

@Injectable()
export class AccessControlAbilityFactory {
  createForUser(request: MaybeAuthenticatedRequest, ...policies: IPolicyHandler[]) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>
    );

    if (request.user?.isAdmin) {
      can(actions.Manage, 'all');
    } else {
      can(actions.Read, 'all');
    }

    policies.forEach(policy => policy.register?.({ request, can, cannot }));

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
