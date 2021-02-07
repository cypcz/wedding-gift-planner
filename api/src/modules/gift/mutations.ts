import { arg, mutationField, nonNull } from "nexus";

export const upsertGift = mutationField("upsertGift", {
  type: "Gift",
  args: {
    input: arg({ type: nonNull("UpsertGiftInput") }),
  },
  async resolve(_root, { input: { id, weddingId, ...input } }, { prisma }) {
    if (id) {
      return prisma.gift.update({ where: { id }, data: { ...input } });
    }

    return prisma.gift.create({
      data: { ...input, wedding: { connect: { id: weddingId } } },
    });
  },
});
