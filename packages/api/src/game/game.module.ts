import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { gameServiceProvider } from './providers/game-service.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  exports: [TypeOrmModule, gameServiceProvider],
  controllers: [GameController],
  providers: [gameServiceProvider]
})
export class GameModule {}
