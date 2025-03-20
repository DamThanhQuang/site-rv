import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePropertyProductDto {
  @IsString()
  @IsNotEmpty()
  propertyCategory: string;

  @IsString()
  @IsNotEmpty()
  propertyType: string;

  @IsString()
  @IsNotEmpty()
  listingType: string;

  @IsNumber()
  @IsNotEmpty()
  floors: number;

  @IsNumber()
  @IsNotEmpty()
  currentFloor: number;

  @IsString()
  @IsNotEmpty()
  buildYear: string;

  @IsString()
  @IsOptional()
  unit: string;
}
