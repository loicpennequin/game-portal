import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Inject
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BaseController } from 'src/core/controllers/base.controller';
import { UUID } from '@gp/shared';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from './entities/user.entity';
import { AccessControl } from 'src/core/decorators/access-control.decorator';
import { UpdateUserPolicy } from './policies/update-user.policy';
import { FindAllUsersQuery } from './dtos/find-all-users-query.dto';
import { FindUserGamesQuery } from './dtos/find-user-games-query.dto';
import { BaseEntityQuery } from 'src/core/filters/base-entity-query';
import { FindUserFriendRequestsQuery } from './dtos/find-user-friend-requests-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IFriendRequestService } from 'src/friend-request/friend-request.interfaces';
import { IUserService } from './interfaces/user-service.interface';
import { IGameService } from 'src/game/interface/game-service.interface';

@Controller('users')
export class UserController extends BaseController {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
    @Inject(IGameService)
    private readonly gameService: IGameService,
    @Inject(IFriendRequestService)
    private readonly friendRequestService: IFriendRequestService
  ) {
    super();
  }

  @Get()
  findAll(@Query() query: FindAllUsersQuery) {
    return this.userService.findAll(query);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User, @Query() query: BaseEntityQuery) {
    return this.userService.findById(user.id, query);
  }

  @Get(':id')
  findById(@Param('id') id: UUID, @Query() query: BaseEntityQuery) {
    return this.userService.findById(id, query);
  }

  @Get(':id/games')
  async findGamesByUserId(
    @Param('id') id: UUID,
    @Query() query: FindUserGamesQuery
  ) {
    return this.gameService.findAll({
      ...query,
      where: { owner: id }
    });
  }

  @Get(':id/friend_requests')
  async findFriendRequestsByUserId(
    @Param('id') id: UUID,
    @Query() query: FindUserFriendRequestsQuery
  ) {
    return this.friendRequestService.findAll({
      ...query,
      where: [{ from: id }, { to: id }]
    });
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @AccessControl(UpdateUserPolicy)
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
    @Body() dto: UpdateUserDto
  ) {
    console.log(dto, avatar);
    return 'ok';
    // return this.userService.updateById(id, dto);
  }
}
