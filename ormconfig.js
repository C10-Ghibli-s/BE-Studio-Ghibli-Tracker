module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  loggin: false,
  entities: ['dist/**/*.entity{.ts, .js}'],
  migrations: ['dist/**/migrations/*.ts'],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: './src/**/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
