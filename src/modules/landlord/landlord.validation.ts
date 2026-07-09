import { z } from "zod";

const createProperty = z.object({
  categoryId: z.string().trim(),
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(255),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),
  location: z.string().trim().min(3, "Location is required").max(255),
  bedrooms: z.number().int().min(1, "Bedrooms must be at least 1"),
  bathrooms: z.number().int().min(1, "Bathrooms must be at least 1"),
  rentAmount: z.number().int().positive("Rent amount must be greater than 0"),
  sizeSqFt: z.number().int().positive("Size must be greater than 0"),
  facilities: z.array(z.string().trim().min(1, "Facilities are required")),
  images: z.string().trim().url("Image must be a valid URL"),
});

const updateProperty = createProperty.partial().extend({
  isAvailable: z.boolean().optional(),
});

export const propertyValidation = {
  createProperty,
  updateProperty,
};
