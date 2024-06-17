import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { ICreateAuthor, IUpdateAuthor } from './types/IAuthor';
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('/create')
  createAuthor(@Body() payload: ICreateAuthor) {
    return this.authorService.createAuthor(payload);
  }

  @Get('/:id')
  getAuthor(@Param('id') authorId: string) {
    return this.authorService.getAuthor(authorId);
  }

  @Get()
  getAuthors() {
    return this.authorService.getAuthors();
  }

  @Put('/:id')
  updateAuthor(
    @Param('id') authorId: string,
    @Body() updatePayload: IUpdateAuthor,
  ) {
    return this.authorService.updateAuthor(authorId, updatePayload);
  }

  @Delete('/:id')
  deleteAuthor(@Param('id') authorId: string) {
    return this.authorService.deleteAuthor(authorId);
  }
}
