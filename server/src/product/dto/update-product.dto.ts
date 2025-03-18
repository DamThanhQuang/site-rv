import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  description: string;
  price: number;

  @IsNotEmpty()
  images: string[];

  propertyType: string;
  location: {
    address: string;
    apartment?: string;
    district: string;
    city: string;
    country: string;
    postalCode?: string;
  };
  amenities: string[];
  privacyType: 'entire_place' | 'private_room' | 'shared_room' | 'public';
  livingRooms: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}
