import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { makeTypeormOptions } from './helper';
import { redisLegecyDb, redisOptions } from './base-redis';


export class DatabaseOptions implements TypeOrmOptionsFactory {
  public createTypeOrmOptions():
    | TypeOrmModuleOptions
    | Promise<TypeOrmModuleOptions> {

    return {
      ...makeTypeormOptions(),
      autoLoadEntities: true,
      synchronize: false,
      retryAttempts: 2,
    };
  }
}

export class DatabaseWithoutLogOptions implements TypeOrmOptionsFactory {
  public createTypeOrmOptions():
    | TypeOrmModuleOptions
    | Promise<TypeOrmModuleOptions> {
    return {
      ...makeTypeormOptions(),
      logging: ['error', 'info', 'warn'],
      autoLoadEntities: true,
      synchronize: false,
      retryAttempts: 2,
    };
  }
}
