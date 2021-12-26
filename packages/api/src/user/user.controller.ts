import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AccessControl } from 'src/auth/decorators/access-control.decorator';
import { accessControlPolicies } from 'src/auth/auth.constants';
import { BaseController } from 'src/core/controllers/base.controller';

@Controller('users')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  @AccessControl({
    bodyDtoClass: CreateUserDto
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
