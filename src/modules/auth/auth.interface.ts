export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profilePhoto?: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};