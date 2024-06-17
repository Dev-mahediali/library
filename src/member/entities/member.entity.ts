import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type MemberDocument = HydratedDocument<Member>;

@Schema({ collection: 'member', timestamps: true })
export class Member {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  membershipDate: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
