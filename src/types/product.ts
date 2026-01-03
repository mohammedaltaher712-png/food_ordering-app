import { Prisma } from "@/generated/prisma/client";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
    extras: true;
  };
}>;