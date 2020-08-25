import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
import { createUsers } from "./users";

export const prisma = new PrismaClient();

const seed = async () => {
  await createUsers(prisma);
};

seed()
  .catch(async (err: Error) => {
    await prisma.$executeRaw("DROP SCHEMA public CASCADE;");
    exec("npm run prisma:migrate:up", () => {
      throw err;
    });
  })
  .finally(() => {
    prisma.$disconnect();
  });
