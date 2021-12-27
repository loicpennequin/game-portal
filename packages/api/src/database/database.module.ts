import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: ['dist/**/*.entity{ .ts,.js}'],
        // logging: true,
        synchronize: false
        // migrationsRun: true
      })
    })
  ]
})
export class DatabaseModule {}
