import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StaffDocument = HydratedDocument<Staff>;

@Schema({ collection: 'staff', timestamps: true })
export class Staff {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  position: string;

  @Prop()
  hireDate: Date;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
