import * as dotenv from 'dotenv';
import * as path from 'path';
import baseConfig from '../../ormconfig';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export default {
  ...baseConfig,
  migrations: ['scripts/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'scripts/database/migrations',
  },
};
