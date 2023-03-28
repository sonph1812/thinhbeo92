import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { DataSource } from "typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    load: [
      databaseConfig,
      authConfig,
      appConfig,
    ],
    envFilePath: '.env',
  }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    UsersModule, AuthModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
