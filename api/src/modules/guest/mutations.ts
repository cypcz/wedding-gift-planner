import { arg, idArg, mutationField } from "@nexus/schema";
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

export const respondToInvitation = mutationField("respondToInvitation", {
  type: "Guest",
  args: {
    id: idArg({ required: true }),
    status: arg({ type: "GuestStatus", required: true }),
  },
  async resolve(_root, { id, status }, { prisma }) {
    return prisma.guest.update({
      where: { id },
      data: { status },
    });
  },
});
