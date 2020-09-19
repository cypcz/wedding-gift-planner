import { queryField } from "@nexus/schema";

export const wedding = queryField("wedding", {
  type: "Wedding",
  nullable: true,
  async resolve(_root, _args, { prisma, user }) {
    const weddingUser = await prisma.user.findOne({
      where: { id: user?.id },
      select: { wedding: true },
    });
    return weddingUser?.wedding || null;
  },
});
