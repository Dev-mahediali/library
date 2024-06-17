import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategoryList() {
    return this.categoryService.getCategories();
  }

  @Get('/:id')
  getCategory(@Param('id') categoryId: string) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @Post('create')
  createCategory(@Body('categoryName') categoryName: string) {
    return this.categoryService.createCategory(categoryName);
  }

  @Put('/:id')
  updateCategory(
    @Param('id') categoryId: string,
    @Body('categoryName') categoryName: string,
  ) {
    return this.categoryService.updateCategory(categoryId, categoryName);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
