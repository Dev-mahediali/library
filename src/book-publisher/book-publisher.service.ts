import { Injectable } from '@nestjs/common';
import { CreateBookPublisherDto } from './dto/create-book-publisher.dto';
import { UpdateBookPublisherDto } from './dto/update-book-publisher.dto';

@Injectable()
export class BookPublisherService {
  create(createBookPublisherDto: CreateBookPublisherDto) {
    return 'This action adds a new bookPublisher';
  }

  findAll() {
    return `This action returns all bookPublisher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookPublisher`;
  }

  update(id: number, updateBookPublisherDto: UpdateBookPublisherDto) {
    return `This action updates a #${id} bookPublisher`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookPublisher`;
  }
}
