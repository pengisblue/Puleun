// ormconfig.ts 파일 내용 예시
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // dotenv 설정

const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
};

export default typeOrmConfig;