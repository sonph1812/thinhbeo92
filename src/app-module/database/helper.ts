import { DataSourceOptions, LoggerOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

function logForDevTest(): Exclude<LoggerOptions, boolean | 'all'> {
  if (['test', 'dev'].includes(process.env.NODE_ENV)) {
    return ['query'];
  }

  return [];
}
export function makeTypeormOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    namingStrategy: new SnakeNamingStrategy(),
    logging: ['error', 'warn', ...logForDevTest()],
    entities: [],
  };
}
