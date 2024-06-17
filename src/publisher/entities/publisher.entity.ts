import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PublisherDocument = HydratedDocument<Publisher>;

@Schema({ collection: 'publisher', timestamps: true })
export class Publisher {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
