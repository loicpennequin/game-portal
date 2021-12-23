import baseConfig from '../ormconfig';

export default {
  ...baseConfig,
  migrationsRun: false,
};
