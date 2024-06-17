import { Module } from '@nestjs/common';
import { BookPublisherService } from './book-publisher.service';
import { BookPublisherController } from './book-publisher.controller';

@Module({
  controllers: [BookPublisherController],
  providers: [BookPublisherService],
})
export class BookPublisherModule {}
