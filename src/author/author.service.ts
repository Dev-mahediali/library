import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './entities/author.entity';
import { Model } from 'mongoose';
import { ICreateAuthor, IUpdateAuthor } from './types/IAuthor';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorService: Model<Author>) {}

  getDBUrl() {
    return this.authorService.find();
  }

  async createAuthor(payload: ICreateAuthor) {
    const { email, firstName, lastName, dob } = payload;
    try {
      const author = await this.authorService.create({
        email,
        firstName,
        lastName,
        birthdate: new Date(dob),
      });

      return author;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAuthor(authorId: string) {
    try {
      const author = await this.authorService.findById(authorId);
      if (!author) {
        throw new NotFoundException();
      }
      return author;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getAuthors() {
    try {
      const authors = await this.authorService.find();
      return authors;
    } catch (error) {
      return [];
    }
  }

  async updateAuthor(authorId: string, updatePayload: IUpdateAuthor) {
    const { firstName, dob, lastName } = updatePayload;
    try {
      const author = await this.getAuthor(authorId);
      if (author) {
        const updatedAuthor = await this.authorService.findByIdAndUpdate(
          authorId,
          {
            firstName,
            lastName,
            birthdate: new Date(dob),
          },
          { new: true },
        );

        return updatedAuthor;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteAuthor(authorId: string) {
    try {
      const author = await this.getAuthor(authorId);
      if (author) {
        await this.authorService.findByIdAndDelete(authorId);
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw error;
    }
  }

  async getAuthorBooks(authorId: string) {
    try {
      const author = await this.getAuthor(authorId);
      if (author) {
        const books = [];
      }
    } catch (error) {}
  }
}
