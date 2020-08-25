import { queryField } from "@nexus/schema";

export const weddings = queryField("weddings", {
  type: "Wedding",
  list: true,
  async resolve(_root, _args, { prisma }) {
    return prisma.wedding.findMany();
  },
});
