import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './utils/exceptions/mongoose-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongooseExceptionFilter());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
