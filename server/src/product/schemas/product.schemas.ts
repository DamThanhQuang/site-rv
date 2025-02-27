import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Business' })
  businessId: Types.ObjectId;

  @Prop({
    type: [
      { userId: String, rating: Number, comment: String, createdAt: Date },
    ],
    default: [],
  })
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];

  @Prop({ default: 0 })
  averageRating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
