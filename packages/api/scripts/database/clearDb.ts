import { ConnectionOptions, getConnection, getConnectionManager } from 'typeorm';
import ormConfig from './ormconfig';

(async function main() {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create({
    ...(ormConfig as ConnectionOptions),
    migrationsRun: false
  });
  await connection.connect();

  const entities = getConnection().entityMetadatas;

  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name);
    console.log(`Clearing table ${entity.tableName}`);
    await repository.delete({});
  }
  await getConnection().close();
})();
