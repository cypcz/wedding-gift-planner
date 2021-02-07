import cuid from "cuid";
import { arg, idArg, mutationField, nonNull } from "nexus";

export const upsertGuest = mutationField("upsertGuest", {
  type: "Guest",
  args: {
    input: arg({ type: nonNull("UpsertGuestInput") }),
  },
  async resolve(
    _root,
    { input: { id, weddingId, plusX, firstName, lastName } },
    { prisma },
  ) {
    const guestId = id || cuid();
    return prisma.guest.upsert({
      where: { id: guestId },
      create: {
        plusX: plusX ?? undefined,
        wedding: { connect: { id: weddingId } },
        firstName,
        lastName,
      },
      update: { plusX: plusX ?? undefined, firstName, lastName },
    });
  },
});

export const respondToInvitation = mutationField("respondToInvitation", {
  type: "Guest",
  args: {
    id: nonNull(idArg()),
    status: arg({ type: nonNull("GuestStatus") }),
  },
  async resolve(_root, { id, status }, { prisma }) {
    return prisma.guest.update({
      where: { id },
      data: { status },
    });
  },
});
