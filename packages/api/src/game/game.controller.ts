import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { AccessControl } from 'src/core/decorators/access-control.decorator';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateGameDto } from './dtos/create-game.dto';
import { FindAllGamesQuery } from './dtos/find-all-games-query.dto';
import { UpdateGameDto } from './dtos/update-game.dto copy';
import { UpdateGamePolicy } from './policies/update-game.policy';
import { IGameService } from './interface/game-service.interface';
import { DeleteGamePolicy } from './policies/delete-game.policy';

@Controller('games')
export class GameController {
  constructor(
    @Inject(IGameService)
    private readonly gameService: IGameService
  ) {}

  @Get()
  findAll(@Query() query: FindAllGamesQuery) {
    return this.gameService.findAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateGameDto, @CurrentUser() user: User) {
    return this.gameService.create({ ...dto, ownerId: user.id });
  }

  @Patch(':id')
  @AccessControl(UpdateGamePolicy)
  update(@Param('id') id: string, @Body() dto: UpdateGameDto) {
    return this.gameService.updateById(id, dto);
  }

  @Delete(':id')
  @AccessControl(DeleteGamePolicy)
  delete(@Param('id') id: string) {
    return this.gameService.delete(id);
  }
}
