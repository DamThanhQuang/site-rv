export class UpdateProductDto {
  title: string;
  description: string;
  price: number;
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
