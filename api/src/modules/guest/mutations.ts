import { arg, mutationField } from "@nexus/schema";

export const upsertGuest = mutationField("upsertGuest", {
  type: "Guest",
  args: {
    input: arg({ type: "UpsertGuestInput", required: true }),
  },
  async resolve(_root, { input: { id, weddingId, plusX, firstName, lastName } }, { prisma }) {
    if (id) {
      return prisma.guest.update({
        where: { id },
        data: { plusX: plusX || undefined, firstName, lastName },
      });
    }

    const linkData = {
      weddingId,
      plusX,
      firstName,
      lastName,
    };
    const base64Data = Buffer.from(JSON.stringify(linkData)).toString("base64");
    const guestLink = `${process.env.FE_URL}/invitation?data=${base64Data}`;

    return prisma.guest.create({
      data: {
        plusX: plusX || undefined,
        wedding: { connect: { id: weddingId } },
        guestLink,
        firstName,
        lastName,
      },
    });
  },
});
