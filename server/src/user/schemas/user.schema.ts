import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  name: string;
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  avatar: string;
  @Prop()
  password: string;
  @Prop({ default: 'user' })
  role: 'admin' | 'user' | 'business';
  @Prop({ default: false })
  isBusiness: boolean;
  @Prop({ type: Types.ObjectId, required: false })
  businessId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
