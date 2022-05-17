import { ConfigService } from '@nestjs/config';

export const typeormModuleOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    ...configService.get('database'),
    entities: ['dist/**/*.entity{ .ts,.js}'],
    // logging: true,
    synchronize: false
    // migrationsRun: true
  })
};
