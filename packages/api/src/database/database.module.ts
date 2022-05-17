import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormModuleOptions } from './typeorm-module.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeormModuleOptions)]
})
export class DatabaseModule {}
