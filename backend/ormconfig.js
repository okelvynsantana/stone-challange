module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/src/modules/**/entities/**.entity{.js,.ts}'],
  migrations: ['dist/src/shared/infra/typeorm/migrations/**{.js,.ts}'],
  migrationsRun: true,
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
