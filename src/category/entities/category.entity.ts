import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ collection: 'category', timestamps: true })
export class Category {
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
