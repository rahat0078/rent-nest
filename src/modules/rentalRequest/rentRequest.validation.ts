import z from "zod";

const createRentRequest = z.object({
  propertyId: z.string(),
  moveInDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Move-in date must future",
  }),
  message: z.string().optional(),
});

export const rentRequestValidation = {
  createRentRequest,
};
