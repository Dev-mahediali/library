import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from 'src/book/entities/book.entity';
import { Member } from 'src/member/entities/member.entity';

export type LoadDocument = HydratedDocument<Loan>;

@Schema({ collection: 'loan', timestamps: true })
export class Loan {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Book.name })
  bookId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Member.name })
  memberId: mongoose.Schema.Types.ObjectId;

  @Prop()
  loadDate: Date;

  @Prop()
  returnDate: Date;

  @Prop()
  status: string;
}

export const LoadSchema = SchemaFactory.createForClass(Loan);
