import { arg, mutationField } from "@nexus/schema";

export const upsertWedding = mutationField("upsertWedding", {
  type: "Wedding",
  args: {
    input: arg({ type: "UpsertWeddingInput", required: true }),
  },
  async resolve(_root, { input: { id, partnersEmail, ...input } }, { prisma, user }) {
    if (id) {
      return prisma.wedding.update({
        where: { id },
        data: { ...input, users: { connect: { id: user?.id } } },
      });
    }

    return prisma.wedding.create({
      data: { ...input, users: { connect: { id: user?.id } } },
    });
  },
});
