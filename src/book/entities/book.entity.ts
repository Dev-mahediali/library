import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from 'src/author/entities/author.entity';
import { Category } from 'src/category/entities/category.entity';

export type BookDocument = HydratedDocument<Book>;

@Schema({ collection: 'book', timestamps: true })
export class Book {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  isbn: string;

  @Prop()
  publicationYear: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  categoryId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Author.name })
  authorId: mongoose.Schema.Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
