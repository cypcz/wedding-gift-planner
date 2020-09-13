/* import { idArg, queryField } from "@nexus/schema";

export const wedding = queryField("wedding", {
  type: "Wedding",
  nullable: true,
  args: {
    id: idArg({ required: true }),
  },
  async resolve(_root, { id }, { prisma, user }) {
    const wedding = await prisma.wedding.findOne({ where: { id }, include: { users: true } });
    if (wedding?.users.some((wUser) => wUser.id === user?.id)) {
      return wedding;
    }

    return null;
  },
}); */
