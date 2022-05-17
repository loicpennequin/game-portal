import { ConnectionOptions, getConnection, getConnectionManager } from 'typeorm';
import ormConfig from './ormconfig';

(async function main() {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create({
    ...(ormConfig as ConnectionOptions),
    migrationsRun: false
  });
  await connection.connect();

  await connection.dropDatabase();
  await connection.synchronize();

  await getConnection().close();
})();
