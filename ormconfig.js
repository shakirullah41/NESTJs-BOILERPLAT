const isProduction = process.env.STAGE === 'prod';
module.exports = [
  {
    ssl: isProduction,
    extra: {
      ssl: isProduction ? { rejectUnauthorized: false } : null,
    },
    type: 'postgres',
    name: 'migration',
    entities: ['src/../**/*.entity.{js,ts}'],
    synchronize: false,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    logging: true,
    migrationsTableName: 'migrations',
    migrations: ['migration/*.{js,ts}'],
    cli: {
      migrationsDir: 'migration',
    },
  },
  {
    ssl: isProduction,
    extra: {
      ssl: isProduction ? { rejectUnauthorized: false } : null,
    },
    name: 'seeder',
    type: 'postgres',
    entities: ['src/../**/*.entity.{js,ts}'],
    synchronize: false,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    logging: true,
    migrationsTableName: 'seeders',
    migrations: ['seeders/*.{js,ts}'],
    cli: {
      migrationsDir: 'seeders',
    },
  },
];
