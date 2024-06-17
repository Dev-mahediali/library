import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICreateBook, IUpdateBook } from './types/IBook';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './entities/book.entity';
import { Model, Types } from 'mongoose';
import { CommonResponse } from 'src/utils/response/common-response';
import { AuthorService } from 'src/author/author.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookService: Model<Book>,
    private authorService: AuthorService,
    private categoryService: CategoryService,
  ) {}

  async getBooks() {
    const pipeline = [
      {
        $lookup: {
          from: 'author',
          localField: 'authorId',
          foreignField: '_id',
          pipeline: [
            {
              $project: { name: { $concat: ['$firstName', ' ', '$lastName'] } },
            },
          ],
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $lookup: {
          from: 'category',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $group: {
          _id: '$_id',
          bookName: {
            $first: '$title',
          },
          publicationYear: {
            $first: '$publicationYear',
          },
          author: {
            $first: '$author.name',
          },
          category: {
            $first: '$category.name',
          },
          isbn: {
            $first: '$isbn',
          },
        },
      },
    ];
    return await this.bookService.aggregate<BookDocument>(pipeline);
  }

  async getBookById(bookId: string) {
    try {
      const book = await this.bookService.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(bookId),
          },
        },
        {
          $lookup: {
            from: 'author',
            localField: 'authorId',
            foreignField: '_id',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  email: 1,
                  name: { $concat: ['$firstName', ' ', '$lastName'] },
                },
              },
            ],
            as: 'author',
          },
        },
        {
          $unwind: '$author',
        },
        {
          $lookup: {
            from: 'category',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: '$category',
        },
        {
          $group: {
            _id: '$_id',
            bookName: {
              $first: '$title',
            },
            publicationYear: {
              $first: '$publicationYear',
            },
            authorDetails: {
              $first: '$author',
            },
            categoryDetails: {
              $first: '$category',
            },
            isbn: {
              $first: '$isbn',
            },
          },
        },
      ]);
      if (book.length === 0) {
        throw new NotFoundException();
      }

      return book[0];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async createBook(bookPayload: ICreateBook) {
    const { categoryId, authorId } = bookPayload;
    const category = await this.categoryService.getCategoryById(
      categoryId,
      true,
    );
    await this.authorService.getAuthor(authorId);
    const book = await this.bookService.create(bookPayload);

    return new CommonResponse(
      HttpStatus.CREATED,
      `A new book has been published and added to the ${category.name} category`,
      book,
    );
  }

  async updateBook(bookId: string, bookPayload: IUpdateBook) {
    await this.getBookById(bookId);
    try {
      const updatedBook = await this.bookService.findByIdAndUpdate(
        bookId,
        bookPayload,
      );

      return new CommonResponse(
        HttpStatus.OK,
        'Book updated success',
        updatedBook,
      );
    } catch (error) {}
  }

  async deleteBook(bookId: string) {
    await this.getBookById(bookId);
    try {
      await this.bookService.findByIdAndDelete(bookId);
      return new CommonResponse(
        HttpStatus.OK,
        'Category deleted success',
        null,
      );
    } catch (error) {
      return error;
    }
  }
}
