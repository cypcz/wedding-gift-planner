import { arg, mutationField, nonNull, nullable, stringArg } from "nexus";
import { ApiErrors } from "../../constants";
import { sendRegisterEmail, sendVerificationEmail } from "../../emails";
import { firebaseAdmin } from "../../firebase";

export const register = mutationField("register", {
  type: "User",
  args: {
    input: arg({ type: nonNull("RegisterInput") }),
  },
  async resolve(
    _root,
    { input: { email, password } },
    { prisma, emailClient },
  ) {
    try {
      const userRecord = await firebaseAdmin.createUser({ email, password });
      const user = await prisma.user.create({
        data: {
          id: userRecord.uid,
          email,
        },
      });
      await sendRegisterEmail(emailClient, email);
      return user;
    } catch (e) {
      if (e.errorInfo?.code === "auth/email-already-exists")
        throw new Error(ApiErrors.UserAlreadyExists);

      console.log(e);
      throw new Error(ApiErrors.Unknown);
    }
  },
});

export const providerRegister = mutationField("providerRegister", {
  type: nullable("User"),
  async resolve(_root, _args, { user: ctxUser, prisma, emailClient }) {
    if (!ctxUser?.uid || !ctxUser?.email) return null;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: ctxUser.uid },
      });

      if (!existingUser) {
        const user = await prisma.user.create({
          data: {
            id: ctxUser.uid,
            email: ctxUser.email,
            emailVerified: true,
          },
        });
        await sendRegisterEmail(emailClient, ctxUser.email);
        return user;
      }

      return null;
    } catch (e) {
      console.error(e);
      throw new Error(ApiErrors.Unknown);
    }
  },
});

export const verifyEmail = mutationField("verifyEmail", {
  type: "User",
  args: {
    email: nonNull(stringArg()),
  },
  async resolve(_root, { email }, { prisma }) {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
      },
    });
    await firebaseAdmin.updateUser(updatedUser.id, { emailVerified: true });
    return updatedUser;
  },
});

export const resendVerificationEmail = mutationField(
  "resendVerificationEmail",
  {
    type: "Boolean",
    async resolve(_root, _args, { user, prisma, emailClient }) {
      if (user?.email) {
        await sendVerificationEmail(
          emailClient,
          user.email,
          await firebaseAdmin.generateEmailVerificationLink(user.email),
        );

        await prisma.user.update({
          where: { email: user.email },
          data: {
            verificationResendLimit: new Date(new Date().getTime() + 5 * 60000),
          },
        });
        return true;
      }

      throw new Error("User must be logged in!");
    },
  },
);
