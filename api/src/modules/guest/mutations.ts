import { arg, mutationField } from "@nexus/schema";
import cuid from "cuid";

export const upsertGuest = mutationField("upsertGuest", {
  type: "Guest",
  args: {
    input: arg({ type: "UpsertGuestInput", required: true }),
  },
  async resolve(_root, { input: { id, weddingId, plusX, firstName, lastName } }, { prisma }) {
    const guestId = id || cuid();
    return prisma.guest.upsert({
      where: { id: guestId },
      create: {
        plusX: plusX || undefined,
        wedding: { connect: { id: weddingId } },
        firstName,
        lastName,
      },
      update: { plusX: plusX || undefined, firstName, lastName },
    });
  },
});
