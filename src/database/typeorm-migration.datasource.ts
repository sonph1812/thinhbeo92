import { DataSource } from 'typeorm';
import { makeTypeormOptions } from './helper';

const datasource = new DataSource({
  ...makeTypeormOptions(),
  logging: true,
  migrations: ['migrations/*{.ts,.js}'],
  entities: ['src/**/entities/*.ts', 'apps/**/entities/*.ts'],
});
export default datasource;
