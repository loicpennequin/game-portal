import { Type, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { serializationGroups } from 'src/core/core.constants';
import { ValidationGroups } from 'src/core/decorators/validation-group.decorator';
import { BaseCollectionQuery } from 'src/core/filters/base-collection-query';
import { BaseQueryFilter } from 'src/core/filters/base-query.filter';

@ValidationGroups(async (entity, request) =>
  [request.user?.id === request.params.id && serializationGroups.OWNED].filter(
    Boolean
  )
)
export class FindUserFriendRequestsQuery extends BaseCollectionQuery {
  @IsOptional()
  @Type(() => BaseQueryFilter)
  @Expose({ groups: [serializationGroups.ADMIN, serializationGroups.OWNED] })
  status?: BaseQueryFilter;
}
