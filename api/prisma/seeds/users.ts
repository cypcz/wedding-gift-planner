import { PrismaClient, UserCreateInput } from "@prisma/client";

export const USER_1 = "bzB5qvUItuPXLZ9PfsQbN9fIZYk2";

const users: UserCreateInput[] = [
  {
    id: USER_1,
  },
];

export async function wipeUsers(prisma: PrismaClient) {
  await prisma.user.deleteMany({});
}

export async function createUsers(prisma: PrismaClient) {
  for (const data of users) {
    await prisma.user.create({
      data,
    });
  }
}
