import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksModule } from './tasks/tasks.module';
import { Task } from './entity/Task';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: 'qamqwpnb',
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Task],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
