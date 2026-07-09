import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export interface IPropertyQuery {
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
  searchTerm?: string;
  category?: string;
  rentAmount?: string;
  location?: string;
  sizeSqFt?: string;
  facilities?: string[];
}

const getAllPropertiesFromDB = async (query: IPropertyQuery) => {
  const { searchTerm, category, rentAmount, location, sizeSqFt } = query;
  const page: number = query.page ? Number(query.page) : 1;
  const limit: number = query.limit ? Number(query.limit) : 10;
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const skip = (page - 1) * limit;
  let facilities: string[] = [];
  if (query.facilities) {
    facilities = Array.isArray(query.facilities)
      ? query.facilities
      : (query.facilities as string).split(",");
  }

  const andCondition: PropertyWhereInput[] = [];

  if (query.searchTerm) {
    andCondition.push({
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (category) {
    andCondition.push({
      categoryId: category,
    });
  }

  if (location) {
    andCondition.push({
      location: {
        contains: location,
        mode: "insensitive",
      },
    });
  }

  if (rentAmount) {
    andCondition.push({
      rentAmount: {
        lte: Number(rentAmount),
      },
    });
  }

  if (sizeSqFt) {
    andCondition.push({
      sizeSqFt: {
        gte: Number(sizeSqFt),
      },
    });
  }

  if (facilities.length > 0) {
    andCondition.push({
      facilities: {
        hasEvery: facilities,
      },
    });
  }

  const where: PropertyWhereInput = {
    AND: andCondition,
  };

  const [property, total] = await Promise.all([
    prisma.property.findMany({
      where,
      take: limit,
      skip: skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        category: {
          select: {
            name: true,
            description: true
          }
        },
        landlord: {
          select: {
            name: true,
            email: true,
            profilePhoto: true,
          },
        },
        review: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    }),
    prisma.property.count({
      where,
    }),
  ]);

  return {
    data: property,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};

const getSinglePropertyFromDB = async (id: string) => {
  const property = await prisma.property.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
        },
      },
      review: {
        include: {
          tenant: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePhoto: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          review: true,
        },
      },
    },
  });
  const rating = await prisma.review.aggregate({
    where: {
      propertyId: property.id,
    },
    _avg: {
      rating: true,
    },
  });

  return {
    ...property,
    averageRating: rating._avg.rating ? rating._avg.rating : 0,
    reviewCount: property._count.review,
  };
};

export const propertyService = {
  getAllPropertiesFromDB,
  getSinglePropertyFromDB,
};
