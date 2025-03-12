import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsMongoId()
  @IsNotEmpty()
  businessId: string;

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  propertyType: string;

  @IsNotEmpty()
  location: {
    address: string;
    apartment?: string;
    district: string;
    city: string;
    country: string;
    postalCode?: string;
  };

  @IsNotEmpty()
  amenities: string[];

  @IsNotEmpty()
  @IsNotEmpty()
  privacyType: 'entire_place' | 'private_room' | 'shared_room' | 'public';

  @IsNumber()
  @IsNotEmpty()
  livingRooms: number;

  @IsNumber()
  @IsNotEmpty()
  bedrooms: number;

  @IsNumber()
  @IsNotEmpty()
  beds: number;

  @IsNumber()
  @IsNotEmpty()
  bathrooms: number;

  @IsNumber()
  @IsNotEmpty()
  discountedPrice: number;
}
