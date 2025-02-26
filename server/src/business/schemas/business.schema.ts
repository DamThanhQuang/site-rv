import { Product } from '@/product/schemas/product.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BusinessDocument = HydratedDocument<Business>;

@Schema({ timestamps: true })
export class Business {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  owner: string; // Chủ sở hữu Business (Email)

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  products: Types.ObjectId[];
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
