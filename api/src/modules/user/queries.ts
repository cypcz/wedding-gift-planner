import { nullable, queryField } from "nexus";

export const me = queryField("me", {
  type: nullable("User"),
  async resolve(_root, _args, { user, prisma }) {
    return prisma.user.findUnique({ where: { id: user?.uid } });
  },
});
