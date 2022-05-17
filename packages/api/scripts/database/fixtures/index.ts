import * as path from 'path';
import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver
} from 'typeorm-fixtures-cli/dist';
import { ConnectionOptions, createConnection, getRepository } from 'typeorm';
import ormConfig from './ormconfig';

const loadFixtures = async (fixturesPath: string) => {
  let connection;

  try {
    connection = await createConnection(ormConfig as ConnectionOptions);
    await connection.synchronize(true);

    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(connection, new Parser());

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = await builder.build(fixture);

      await getRepository(entity.constructor.name).save(entity);
    }
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

loadFixtures(path.join(process.cwd(), 'scripts/database/fixtures'))
  .then(() => {
    console.log('Fixtures are successfully loaded.');
  })
  .catch(err => console.log(err));
