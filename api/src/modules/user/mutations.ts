import { arg, mutationField } from "@nexus/schema";
import { sendRegisterEmail } from "../../emails";
import { firebaseAdmin } from "../../firebase";
import { createSessionCookie } from "./utils";

export const register = mutationField("register", {
  type: "Boolean",
  args: {
    input: arg({ type: "RegisterInput", required: true }),
  },
  async resolve(_root, { input: { email, password, weddingId } }, { prisma, emailClient }) {
    const userRecord = await firebaseAdmin.createUser({ email, password });
    await prisma.user.create({
      data: {
        id: userRecord.uid,
        email,
        wedding: weddingId ? { connect: { id: weddingId } } : undefined,
      },
    });
    await sendRegisterEmail(emailClient, email);
    return true;
  },
});

export const login = mutationField("login", {
  type: "Boolean",
  args: {
    input: arg({ type: "LoginInput", required: true }),
  },
  async resolve(
    _root,
    { input: { idToken, csrfToken, weddingId, isProvider } },
    { req, res, prisma, emailClient }
  ) {
    if (isProvider) {
      try {
        const decodedToken = await firebaseAdmin.verifyIdToken(idToken);
        const user = await prisma.user.findOne({ where: { id: decodedToken.uid } });

        if (!user) {
          await prisma.user.create({
            data: {
              id: decodedToken.uid,
              email: decodedToken.email!,
              wedding: weddingId ? { connect: { id: weddingId } } : undefined,
            },
          });
          await sendRegisterEmail(emailClient, decodedToken.email!);
        }
      } catch (e) {
        console.error(e);
        throw new Error();
      }
    }
    await createSessionCookie({ req, res, idToken, csrfToken });
    return true;
  },
});

export const logout = mutationField("logout", {
  type: "Boolean",
  async resolve(_root, _args, { res }) {
    res.clearCookie("session");
    return true;
  },
});
