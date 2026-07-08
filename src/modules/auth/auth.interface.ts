import { Role } from "../../../generated/prisma/enums";

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
  profilePhoto?: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};