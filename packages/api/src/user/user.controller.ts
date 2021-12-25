import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializerInterceptor } from 'src/core/interceptors/serializer.interceptor';
import { AccessControl } from 'src/auth/decorators/access-control.decorator';
import { accessControlPolicies } from 'src/auth/auth.constants';
import { classToPlain, Expose } from 'class-transformer';

class MyClass {
  @Expose()
  foo: number;

  @Expose({ groups: ['foo'] })
  bar: number;
}

@Controller('users')
@UseInterceptors(SerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
      ADMIN: accessControlPolicies.ANY,
    },
    isOwn: req => req.user.id === req.params.id,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
