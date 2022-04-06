import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BaseController } from 'src/core/controllers/base.controller';
import { UUID } from '@gp/shared';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from './entities/user.entity';
import { AccessControl } from 'src/access-control/decorators/access-control.decorator';
import { UpdateUserPolicy } from './policies/update-user.policy';
import { FindAllUsersQuery } from './dtos/find-all-users-query.dto';

@Controller('users')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get()
  findAll(@Query() query: FindAllUsersQuery) {
    return this.userService.findAll(query);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    return user;
  }

  @Get(':id')
  findById(@Param('id') id: UUID) {
    return this.userService.findById(id);
  }

  @Get(':id/games')
  findGamesByUserId(@Param('id') id: UUID) {
    return this.userService.loadRelation({ owner: id, relationName: 'games' });
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @AccessControl(UpdateUserPolicy)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateById(id, dto);
  }
}
