import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema()
export class Property {
  // Loại nào giống nhà/phòng cho thuê của bạn nhất? (ví dụ: "Nhà", "Căn hộ", …)
  @Prop({ required: true })
  propertyCategory: string;

  // Loại chỗ ở (ví dụ: "Nhà", "Cabin", …)
  @Prop({ required: true })
  propertyType: string;

  // Loại hình cho thuê (ví dụ: "Toàn bộ nhà")
  @Prop({ required: true })
  listingType: string;

  // Tòa nhà đó có bao nhiêu tầng?
  @Prop({ required: true })
  floors: number;

  // Nhà/phòng cho thuê nằm ở tầng mấy?
  @Prop({ required: true })
  currentFloor: number;

  // Năm xây dựng (lưu dưới dạng chuỗi để dễ kiểm tra định dạng nếu cần)
  @Prop({ required: true })
  buildYear: string;

  // Quy mô chỗ ở: đơn vị tính, mặc định là "Feet vuông"
  @Prop({ default: 'Feet vuông' })
  unit: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
