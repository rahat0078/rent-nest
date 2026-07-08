import { z } from "zod";

const registerUser = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(255, "Phone number is too long"),
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password cannot exceed 255 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^[+]?[0-9]+$/, "Invalid phone number")
    .optional(),
  profilePhoto: z.string().url("Profile photo must be a valid URL").optional(),
  role: z.enum(["TENANT", "LANDLORD", "ADMIN"]).optional().default("TENANT"),
});

const loginUser = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const userValidations = {
  registerUser,
  loginUser,
};
