export type TCreateProperty = {
  categoryId: string;
  title: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  rentAmount: number;
  sizeSqFt: number;
  facilities: string[];
  images: string;
};

export type TUpdateProperty = Partial<TCreateProperty> & {
  isAvailable?: boolean;
};