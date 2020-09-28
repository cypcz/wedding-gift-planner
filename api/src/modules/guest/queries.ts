import { idArg, queryField } from "@nexus/schema";

export const guests = queryField("guests", {
  type: "Guest",
  list: true,
  async resolve(_root, __args, { prisma, user }) {
    return prisma.guest.findMany({
      where: { wedding: { authors: { some: { id: user?.id } } } },
    });
  },
});

export const guest = queryField("guest", {
  type: "Guest",
  nullable: true,
  args: {
    id: idArg({ required: true }),
  },
  async resolve(_root, { id }, { prisma }) {
    return prisma.guest.findOne({ where: { id } });
  },
});

export const guestInvitation = queryField("guestInvitation", {
  type: "Guest",
  nullable: true,
  args: {
    id: idArg({ required: true }),
  },
  async resolve(_root, { id }, { prisma }) {
    return prisma.guest.findOne({ where: { id } });
  },
});
