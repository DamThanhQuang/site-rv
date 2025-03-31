import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateBookingDto {
  @IsMongoId()
  productId: string;

  @IsDate()
  @Type(() => Date)
  checkIn: Date;

  @IsDate()
  @Type(() => Date)
  checkOut: Date;

  @IsNumber()
  @IsPositive()
  @Min(1)
  guests: number;

  @IsNumber()
  @IsPositive()
  totalPrice: number;
}
