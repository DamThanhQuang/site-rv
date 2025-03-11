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
  title: string;

  @Prop({ required: true })
  propertyType: string; // Apartment, House, Villa, ...

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  discountedPrice: number;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ required: true })
  image: string; // Main image/thumbnail

  @Prop({ required: true, type: Types.ObjectId, ref: 'Business' })
  businessId: Types.ObjectId;

  // Location details
  @Prop({ type: Object, required: true })
  location: {
    address: string;
    apartment?: string;
    district: string;
    city: string;
    country: string;
    postalCode?: string;
  };

  // Privacy type
  @Prop({
    required: true,
    enum: ['entire_place', 'private_room', 'shared_room'],
  })
  privacyType: string;

  // Floor plan details
  @Prop({ required: true })
  livingRooms: number;

  @Prop({ required: true })
  bedrooms: number;

  @Prop({ required: true })
  beds: number;

  @Prop({ required: true })
  bathrooms: number;

  // Amenities
  @Prop({ type: [String], default: [] })
  amenities: string[];

  // Reviews
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

  @Prop({ default: false })
  isNew: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
