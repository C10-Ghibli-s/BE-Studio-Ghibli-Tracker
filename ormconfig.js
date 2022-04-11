module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['scr/**/*.entity.ts'],
  cli: {
    migrationsDir: 'scr/database/migrations',
  },
};
