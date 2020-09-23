import { arg, mutationField, stringArg } from "@nexus/schema";
import cuid from "cuid";
import { sendPartnerInvitationEmail } from "../../emails";
import { firebaseAdmin } from "../../firebase";
import { encodeInBase64 } from "../../utils";

export const upsertWedding = mutationField("upsertWedding", {
  type: "Wedding",
  args: {
    input: arg({ type: "UpsertWeddingInput", required: true }),
  },
  async resolve(_root, { input: { id, ...input } }, { prisma, user }) {
    const weddingId = id || cuid();
    return prisma.wedding.upsert({
      where: { id: weddingId },
      create: { ...input, id: weddingId, authors: { connect: { id: user?.id } } },
      update: { ...input, authors: { connect: { id: user?.id } } },
    });
  },
});

export const invitePartner = mutationField("invitePartner", {
  type: "Boolean",
  args: {
    email: stringArg({ required: true }),
  },
  async resolve(_root, { email }, { req, prisma, user, emailClient }) {
    const weddingUser = await prisma.user.findOne({
      where: { id: user?.id },
      select: { wedding: { select: { id: true, authors: true } } },
    });
    if (weddingUser?.wedding && weddingUser.wedding.authors.length > 1)
      throw new Error("Your wedding already has a partner!");
    try {
      await firebaseAdmin.getUserByEmail(email);
      throw new Error("User already exists!");
    } catch (e) {
      if (e.errorInfo.code === "auth/user-not-found") {
        const data = encodeInBase64({ weddingId: weddingUser?.wedding?.id, email });
        const link = `${req.headers.origin}/auth?data=${data}`;
        await sendPartnerInvitationEmail(emailClient, email, link);
      }
    }

    return true;
  },
});
