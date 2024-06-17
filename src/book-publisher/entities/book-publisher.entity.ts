import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from 'src/book/entities/book.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';

export type BookPublisherDocument = HydratedDocument<BookPublisher>;

@Schema({ collection: 'bookpublisher', timestamps: true })
export class BookPublisher {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Book.name })
  bookId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Publisher.name })
  publisherId: mongoose.Schema.Types.ObjectId;
}

export const BookPublisherSchema = SchemaFactory.createForClass(BookPublisher);
