import { prisma } from "../../lib/prisma";

type TCreateCategory = {
  name: string;
  description?: string;
};

const createCategoryIntoDB = async (payload: TCreateCategory) => {
  return await prisma.category.create({
    data: payload,
  });
};

const getAllCategoriesFromDB = async () => {
  return await prisma.category.findMany();
};

const getSingleCategoriesFromDB = async (id: string) => {
  return await prisma.category.findMany({
    where: {
      id,
    },
    select: {
      property: true
    }
  });
};

export const categoryService = {
  getAllCategoriesFromDB,
  createCategoryIntoDB,
  getSingleCategoriesFromDB,
};
