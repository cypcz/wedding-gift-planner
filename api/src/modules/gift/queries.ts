import { idArg, queryField } from "@nexus/schema";

export const gifts = queryField("gifts", {
  type: "Gift",
  list: true,
  async resolve(_root, _args, { prisma, user }) {
    return prisma.gift.findMany({
      where: { wedding: { authors: { some: { id: user?.id } } } },
    });
  },
});

export const gift = queryField("gift", {
  type: "Gift",
  nullable: true,
  args: {
    id: idArg({ required: true }),
  },
  async resolve(_root, { id }, { prisma }) {
    return prisma.gift.findOne({ where: { id } });
  },
});
