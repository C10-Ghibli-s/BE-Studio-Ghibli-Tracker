import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './../configs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getSsl } from 'src/common/helpers/get-ssl';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const ssl = getSsl();
        return {
          type: 'postgres',
          url: configService.postgresUrl,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: false,
          autoLoadEntities: true,
          ssl,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const ssl = getSsl();
        const client = new Client({
          connectionString: configService.postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
