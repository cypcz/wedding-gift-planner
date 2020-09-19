import { arg, mutationField } from "@nexus/schema";

export const upsertGift = mutationField("upsertGift", {
  type: "Gift",
  args: {
    input: arg({ type: "UpsertGiftInput", required: true }),
  },
  async resolve(_root, { input: { id, weddingId, ...input } }, { prisma, user }) {
    if (id) {
      return prisma.gift.update({ where: { id }, data: { ...input } });
    }

    return prisma.gift.create({
      data: { ...input, wedding: { connect: { id: weddingId } } },
    });
  },
});
