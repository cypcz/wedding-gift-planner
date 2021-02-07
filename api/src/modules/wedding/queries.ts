import { nullable, queryField } from "nexus";

export const wedding = queryField("wedding", {
  type: nullable("Wedding"),
  async resolve(_root, _args, { prisma, user }) {
    return prisma.wedding.findFirst({
      where: { authors: { some: { id: user?.uid } } },
    });
  },
});
