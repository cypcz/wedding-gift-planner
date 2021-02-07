import { idArg, list, nonNull, nullable, queryField } from "nexus";

export const gifts = queryField("gifts", {
  type: list("Gift"),
  async resolve(_root, _args, { prisma, user }) {
    return prisma.gift.findMany({
      where: { wedding: { authors: { some: { id: user?.uid || "" } } } },
    });
  },
});

export const gift = queryField("gift", {
  type: nullable("Gift"),
  args: {
    id: nonNull(idArg()),
  },
  async resolve(_root, { id }, { prisma }) {
    return prisma.gift.findUnique({ where: { id } });
  },
});
