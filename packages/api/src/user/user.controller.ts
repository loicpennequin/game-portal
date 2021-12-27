import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AccessControl } from 'src/auth/decorators/access-control.decorator';
import { accessControlPolicies } from 'src/auth/auth.constants';
import { BaseController } from 'src/core/controllers/base.controller';
import { UUID } from '@gp/shared';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get()
  findAll() {
    return this.userService.findAll();
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
  @AccessControl({
    bodyDtoClass: CreateUserDto
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @AccessControl({
    roles: {
      USER: accessControlPolicies.OWN,
      ADMIN: accessControlPolicies.ANY
    },
    isOwn: req => req.user.id === req.params.id,
    bodyDtoClass: UpdateUserDto
  })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    console.log(id, dto);
    return this.userService.updateById(id, dto);
  }
}
