import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { CommonResponse } from 'src/utils/response/common-response';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryService: Model<Category>,
  ) {}

  getCategories() {
    return this.categoryService.find();
  }

  async getCategoryById(categoryId: string, lean?: boolean) {
    try {
      let category: Category;
      if (lean) {
        category = await this.categoryService.findById(categoryId).lean();
      } else {
        category = await this.categoryService.findById(categoryId);
      }
      if (!category) {
        throw new NotFoundException();
      }
      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async createCategory(categoryName: string) {
    try {
      const newCategory = await this.categoryService.create({
        name: categoryName,
      });

      return new CommonResponse(
        HttpStatus.CREATED,
        'A new category has been created',
        newCategory,
      );
    } catch (error) {
      throw new HttpException(
        error?.message || 'Category Creation Failed',
        HttpStatus.NO_CONTENT,
      );
    }
  }

  async updateCategory(categoryId: string, categoryName: string) {
    try {
      // To handle whether category exists or not
      await this.getCategoryById(categoryId);

      const updatedCategory = await this.categoryService.findByIdAndUpdate(
        categoryId,
        { name: categoryName },
        { new: true },
      );

      return new CommonResponse(
        HttpStatus.OK,
        'Category updated success',
        updatedCategory,
      );
    } catch (error) {
      return error;
    }
  }

  async deleteCategory(categoryId: string) {
    await this.getCategoryById(categoryId);
    try {
      await this.categoryService.findByIdAndDelete(categoryId);
      return new CommonResponse(
        HttpStatus.NO_CONTENT,
        'Category deleted success',
        null,
      );
    } catch (error) {
      return error;
    }
  }
}
