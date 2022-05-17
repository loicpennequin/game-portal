import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export default {
  port: parseInt(process.env.DB_PORT, 10),
  host: process.env.DB_HOST,
  type: process.env.DB_TYPE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
  migrations: [],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'scripts/database/migrations'
  }
};
