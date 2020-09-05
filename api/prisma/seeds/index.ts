import { PrismaClient } from "@prisma/client";
import { createUsers } from "./users";

export const prisma = new PrismaClient();

const seed = async () => {
  await createUsers(prisma);
};

seed()
  .catch((err: Error) => {
    throw err;
  })
  .finally(() => {
    prisma.$disconnect();
  });
