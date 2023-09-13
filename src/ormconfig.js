const isProduction = process.env.STAGE === 'prod';
module.exports = {
  ssl: isProduction,
  extra: {
    ssl: isProduction ? { rejectUnauthorized: false } : null,
  },
  type: 'postgres',
  entities: ['src/../**/*.entity.{js,ts}'],
  synchronize: false,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  migrationsTableName: 'migrations',
  migrations: ['migration/*.{js,ts}'],
  cli: {
    migrationsDir: 'migration',
  },
};
