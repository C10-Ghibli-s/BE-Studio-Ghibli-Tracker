module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  loggin: false,
  entities: ['dist/**/*.entity.ts'],
  migrations: ['dist/**/migrations/*.ts'],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
