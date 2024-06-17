import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookPublisherService } from './book-publisher.service';
import { CreateBookPublisherDto } from './dto/create-book-publisher.dto';
import { UpdateBookPublisherDto } from './dto/update-book-publisher.dto';

@Controller('book-publisher')
export class BookPublisherController {
  constructor(private readonly bookPublisherService: BookPublisherService) {}

  @Post()
  create(@Body() createBookPublisherDto: CreateBookPublisherDto) {
    return this.bookPublisherService.create(createBookPublisherDto);
  }

  @Get()
  findAll() {
    return this.bookPublisherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookPublisherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookPublisherDto: UpdateBookPublisherDto) {
    return this.bookPublisherService.update(+id, updateBookPublisherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookPublisherService.remove(+id);
  }
}
