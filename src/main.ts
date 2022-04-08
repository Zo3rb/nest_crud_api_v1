import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  AppDataSource.initialize()
    .then(() => {
      console.log('Database Connection Established Successfully');
    })
    .catch((error) => console.log(error));
}
bootstrap();
