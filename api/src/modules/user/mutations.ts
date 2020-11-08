import { arg, mutationField, stringArg } from "@nexus/schema";
import { sendRegisterEmail, sendVerificationEmail } from "../../emails";
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
    await sendRegisterEmail(
      emailClient,
      email,
      await firebaseAdmin.generateEmailVerificationLink(email)
    );
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
              emailVerified: true,
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

export const verifyEmail = mutationField("verifyEmail", {
  type: "Boolean",
  args: {
    email: stringArg({ required: true }),
  },
  async resolve(_root, { email }, { prisma }) {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
      },
    });
    await firebaseAdmin.updateUser(updatedUser.id, { emailVerified: true });
    return true;
  },
});

export const resendVerificationEmail = mutationField("resendVerificationEmail", {
  type: "Boolean",
  async resolve(_root, _args, { user, prisma, emailClient }) {
    if (user?.email) {
      await sendVerificationEmail(
        emailClient,
        user.email,
        await firebaseAdmin.generateEmailVerificationLink(user.email)
      );

      await prisma.user.update({
        where: { email: user.email },
        data: { verificationResendLimit: new Date(new Date().getTime() + 5 * 60000) },
      });
      return true;
    }

    throw new Error("User must be logged in!");
  },
});

export const logout = mutationField("logout", {
  type: "Boolean",
  async resolve(_root, _args, { res }) {
    res.clearCookie("session");
    return true;
  },
});
