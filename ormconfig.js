module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  loggin: false,
  entities: ['dist/database/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'dist/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
