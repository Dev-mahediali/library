import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ICreateBook, IUpdateBook } from './types/IBook';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }

  @Get('/:id')
  getBook(@Param('id') bookId: string) {
    return this.bookService.getBookById(bookId);
  }

  @Post('/create')
  createBook(@Body() bookPayload: ICreateBook) {
    return this.bookService.createBook(bookPayload);
  }

  @Put('/:id')
  updateBook(@Param('id') bookId: string, @Body() updatePayload: IUpdateBook) {
    return this.bookService.updateBook(bookId, updatePayload);
  }

  @Delete('/:id')
  deleteBook(@Param('id') bookId: string) {
    return this.bookService.deleteBook(bookId);
  }
}
