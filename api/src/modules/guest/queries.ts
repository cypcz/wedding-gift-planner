import { idArg, list, nonNull, nullable, queryField } from "nexus";

export const guests = queryField("guests", {
  type: list("Guest"),
  async resolve(_root, __args, { prisma, user }) {
    return prisma.guest.findMany({
      where: { wedding: { authors: { some: { id: user?.uid || "" } } } },
    });
  },
});

export const guest = queryField("guest", {
  type: nullable("Guest"),
  args: {
    id: nonNull(idArg()),
  },
  async resolve(_root, { id }, { prisma }) {
    return prisma.guest.findUnique({ where: { id } });
  },
});

export const guestInvitation = queryField("guestInvitation", {
  type: nullable("Guest"),
  args: {
    id: nonNull(idArg()),
  },
  async resolve(_root, { id }, { prisma }) {
    return prisma.guest.findUnique({ where: { id } });
  },
});
